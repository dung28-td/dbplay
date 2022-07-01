package mutations

import (
	"github.com/dung28-td/dbplay/client"
	"github.com/dung28-td/dbplay/constants"
	"github.com/dung28-td/dbplay/schema/types"
	"github.com/graphql-go/graphql"
)

var DeleteRedisRecords = graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"keys": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.ID),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		connection := p.Context.Value(constants.CurrentConnectionContextKey).(*types.Connection)
		client := connection.Client.(*client.ClientRedis)
		var keys []string
		for _, key := range p.Args["keys"].([]any) {
			keys = append(keys, key.(string))
		}
		if err := client.Client.Del(p.Context, keys...).Err(); err != nil {
			return nil, err
		}

		return "ok", nil
	},
}
