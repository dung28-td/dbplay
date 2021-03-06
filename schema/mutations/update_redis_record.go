package mutations

import (
	"github.com/dung28-td/dbplay/client"
	"github.com/dung28-td/dbplay/constants"
	"github.com/dung28-td/dbplay/schema/inputs"
	"github.com/dung28-td/dbplay/schema/types"
	"github.com/dung28-td/dbplay/x"
	"github.com/graphql-go/graphql"
)

var UpdateRedisRecord = graphql.Field{
	Type: types.RedisRecordType,
	Args: graphql.FieldConfigArgument{
		"key": &graphql.ArgumentConfig{
			Type: graphql.ID,
		},
		"input": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(inputs.RedisRecordInputObject),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		connection := p.Context.Value(constants.CurrentConnectionContextKey).(*types.Connection)
		client := connection.Client.(*client.ClientRedis)
		var input types.RedisRecord
		if err := x.Bind(p.Args["input"], &input); err != nil {
			return nil, err
		}

		if err := client.Client.Del(p.Context, p.Args["key"].(string)).Err(); err != nil {
			return nil, err
		}

		if err := client.SetWithExpiration(p.Context, input.Type, input.Key, input.Value, input.ExpireAt); err != nil {
			return nil, err
		}

		result, e, err := client.GetWithExpiration(p.Context, input.Key)
		if err != nil {
			return nil, err
		}

		return types.RedisRecord{
			Key:      input.Key,
			Type:     input.Type,
			Value:    result,
			ExpireAt: e,
		}, nil
	},
}
