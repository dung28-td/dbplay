package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/dung28-td/dbplay/constants"
	"github.com/dung28-td/dbplay/schema"
	"github.com/dung28-td/dbplay/schema/types"
	"github.com/graphql-go/graphql"
)

type graphqlBody struct {
	Query         string         `json:"query"`
	OperationName string         `json:"operationName"`
	Variables     map[string]any `json:"variables"`
}

func graphqlHandler(w http.ResponseWriter, r *http.Request) {
	var body graphqlBody

	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	var connection *types.Connection
	if id := r.Header.Get("X-Connection-ID"); id != "" {
		if c, err := types.GetConnectionFromDB(r.Context(), id); err == nil {
			connection = c
		}
	}

	result := graphql.Do(graphql.Params{
		Context:        context.WithValue(r.Context(), constants.CurrentConnectionContextKey, connection),
		Schema:         schema.Schema,
		RequestString:  body.Query,
		OperationName:  body.OperationName,
		VariableValues: body.Variables,
	})

	w.Header().Set("Content-Type", "application/json")

	if err := json.NewEncoder(w).Encode(result); err != nil {
		fmt.Printf("Could not write result to response: %s", err)
	}
}
