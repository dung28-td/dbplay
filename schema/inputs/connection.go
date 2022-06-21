package inputs

import "github.com/graphql-go/graphql"

type CreateConnectionInput struct {
	Name *string `json:"name"`
	DSN  string  `json:"dsn"`
}

var CreateConnectionInputObject = graphql.NewInputObject(graphql.InputObjectConfig{
	Name: "CreateConnectionInput",
	Fields: graphql.InputObjectConfigFieldMap{
		"name": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"dsn": &graphql.InputObjectFieldConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
})
