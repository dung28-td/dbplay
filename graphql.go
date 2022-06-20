package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/dung28-td/dbplay/schema"
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

	result := graphql.Do(graphql.Params{
		Context:        r.Context(),
		Schema:         schema.Schema,
		RequestString:  body.Query,
		OperationName:  body.OperationName,
		VariableValues: body.Variables,
	})

	if err := json.NewEncoder(w).Encode(result); err != nil {
		fmt.Printf("Could not write result to response: %s", err)
	}
}
