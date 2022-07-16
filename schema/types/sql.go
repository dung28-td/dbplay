package types

import (
	"github.com/graphql-go/graphql"
)

var SQLTableType = graphql.NewObject(graphql.ObjectConfig{
	Name: "SQLTable",
	Fields: graphql.Fields{
		"schema": &graphql.Field{
			Type: graphql.String,
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
	},
})
