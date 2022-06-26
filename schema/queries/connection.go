package queries

import (
	"github.com/dung28-td/dbplay/client"
	"github.com/dung28-td/dbplay/schema/types"
	"github.com/graphql-go/graphql"
)

var Connection = graphql.Field{
	Type: types.ConnectionType,
	Args: graphql.FieldConfigArgument{
		"connectionId": &graphql.ArgumentConfig{
			Type: graphql.ID,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		connection, err := types.GetConnectionFromDB(p.Context, p.Args["connectionId"].(string))
		if err != nil {
			return connection, err
		}
		if _, err := client.NewClient(connection.DSN); err != nil {
			return connection, err
		}

		connection.Connected = true
		return connection, err
	},
}
