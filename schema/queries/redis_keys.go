package queries

import (
	"github.com/dung28-td/dbplay/client"
	"github.com/dung28-td/dbplay/constants"
	"github.com/dung28-td/dbplay/schema/types"
	"github.com/graphql-go/graphql"
)

type RedisScanResult struct {
	Cursor uint64              `json:"cursor"`
	Keys   []types.RedisRecord `json:"keys"`
}

var RedisKeys = graphql.Field{
	Type: graphql.NewObject(graphql.ObjectConfig{
		Name: "RedisScanResult",
		Fields: graphql.Fields{
			"cursor": &graphql.Field{
				Type: graphql.Int,
			},
			"keys": &graphql.Field{
				Type: graphql.NewList(types.RedisRecordType),
			},
		},
	}),
	Args: graphql.FieldConfigArgument{
		"cursor": &graphql.ArgumentConfig{
			Type:         graphql.Int,
			DefaultValue: 0,
		},
		"pattern": &graphql.ArgumentConfig{
			Type:         graphql.String,
			DefaultValue: "",
		},
		"count": &graphql.ArgumentConfig{
			Type:         graphql.Int,
			DefaultValue: 0,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		connection := p.Context.Value(constants.CurrentConnectionContextKey).(*types.Connection)
		client := connection.Client.(*client.ClientRedis)
		var records []types.RedisRecord

		keys, cursor, err := client.Client.
			Scan(p.Context, uint64(p.Args["cursor"].(int)), "*"+p.Args["pattern"].(string)+"*", int64(p.Args["count"].(int))).
			Result()

		if err != nil {
			return nil, err
		}

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

		return RedisScanResult{
			Cursor: cursor,
			Keys:   records,
		}, nil
	},
}
