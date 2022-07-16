package types

import (
	"github.com/dung28-td/dbplay/client"
	"github.com/dung28-td/dbplay/constants"
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
		"columns": &graphql.Field{
			Type: graphql.NewList(SQLColumnType),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				src := p.Source.(client.TableSQL)
				connection := p.Context.Value(constants.CurrentConnectionContextKey).(*Connection)

				return connection.Client.Columns(p.Context, src.Schema, src.Name)
			},
		},
	},
})

var SQLColumnType = graphql.NewObject(graphql.ObjectConfig{
	Name: "SQLColumn",
	Fields: graphql.Fields{
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"dataType": &graphql.Field{
			Type: graphql.String,
		},
	},
})
