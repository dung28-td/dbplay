package schema

import "github.com/graphql-go/graphql"

var connectionType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Connection",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.ID,
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"dsn": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
})

var Schema, _ = graphql.NewSchema(graphql.SchemaConfig{
	Query:    query,
	Mutation: mutation,
})
