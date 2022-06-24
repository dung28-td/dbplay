package queries

import (
	"github.com/dung28-td/dbplay/client"
	"github.com/dung28-td/dbplay/constants"
	"github.com/dung28-td/dbplay/schema/types"
	"github.com/graphql-go/graphql"
)

var RedisValue = graphql.Field{
	Type: graphql.NewNonNull(graphql.String),
	Args: graphql.FieldConfigArgument{
		"key": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		connection := p.Context.Value(constants.CurrentConnectionContextKey).(types.Connection)
		client := connection.Client.(*client.ClientRedis)
		return client.Value(p.Context, p.Args["key"].(string))
	},
}
