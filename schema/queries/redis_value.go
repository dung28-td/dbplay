package queries

import (
	"github.com/dung28-td/dbplay/client"
	"github.com/dung28-td/dbplay/constants"
	"github.com/dung28-td/dbplay/schema/types"
	"github.com/graphql-go/graphql"
)

var RedisValue = graphql.Field{
	Type: graphql.NewNonNull(types.RedisRecordType),
	Args: graphql.FieldConfigArgument{
		"key": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		connection := p.Context.Value(constants.CurrentConnectionContextKey).(types.Connection)
		client := connection.Client.(*client.ClientRedis)
		k := p.Args["key"].(string)
		t, err := client.Client.Type(p.Context, k).Result()
		if err != nil {
			return nil, err
		}
		v, err := client.Value(p.Context, k)
		if err != nil {
			return nil, err
		}
		return types.RedisRecord{
			Key:   k,
			Type:  t,
			Value: v,
		}, nil
	},
}
