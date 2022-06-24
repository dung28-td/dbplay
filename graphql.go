package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/dung28-td/dbplay/constants"
	"github.com/dung28-td/dbplay/db"
	"github.com/dung28-td/dbplay/db/models"
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

	var c types.Connection
	if connectionId, err := strconv.ParseInt(r.Header.Get("X-Connection-ID"), 10, 64); err == nil {
		v := new(models.Connection)
		if err := db.DB.NewSelect().
			Model(v).
			Where("id = ?", connectionId).
			Scan(r.Context()); err == nil {
			c = types.ConvertBunModelToConnection(v)
		}
	}

	result := graphql.Do(graphql.Params{
		Context:        context.WithValue(r.Context(), constants.CurrentConnectionContextKey, c),
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
