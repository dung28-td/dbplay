package queries

import (
	"github.com/dung28-td/dbplay/client"
	"github.com/dung28-td/dbplay/schema/types"
	"github.com/graphql-go/graphql"
)

var SQLTable = graphql.Field{
	Type: types.SQLTableType,
	Args: graphql.FieldConfigArgument{
		"schema": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"name": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		schema := p.Args["schema"].(string)
		name := p.Args["name"].(string)

		return client.TableSQL{
			Schema: schema,
			Name:   name,
		}, nil
	},
}
