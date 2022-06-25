package queries

import (
	"github.com/dung28-td/dbplay/client"
	"github.com/dung28-td/dbplay/constants"
	"github.com/dung28-td/dbplay/schema/types"
	"github.com/graphql-go/graphql"
)

var RedisKeys = graphql.Field{
	Type: graphql.NewList(types.RedisRecordType),
	Args: graphql.FieldConfigArgument{
		"input": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		connection := p.Context.Value(constants.CurrentConnectionContextKey).(types.Connection)
		client := connection.Client.(*client.ClientRedis)
		var records []types.RedisRecord
		if keys, err := client.Keys(p.Context, p.Args["input"].(string)); err != nil {
			return nil, err
		} else {
			for i := range keys {
				k := keys[i]
				if t, err := client.Client.Type(p.Context, k).Result(); err != nil {
					return nil, err
				} else {
					records = append(records, types.RedisRecord{
						Key:  k,
						Type: t,
					})
				}
			}
		}
		return records, nil
	},
}
