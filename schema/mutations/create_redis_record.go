package mutations

import (
	"github.com/dung28-td/dbplay/client"
	"github.com/dung28-td/dbplay/constants"
	"github.com/dung28-td/dbplay/schema/inputs"
	"github.com/dung28-td/dbplay/schema/types"
	"github.com/dung28-td/dbplay/x"
	"github.com/graphql-go/graphql"
)

var CreateRedisRecord = graphql.Field{
	Type: types.RedisRecordType,
	Args: graphql.FieldConfigArgument{
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

		if err := client.Set(p.Context, input.Type, input.Key, input.Value); err != nil {
			return nil, err
		}

		result, err := client.Get(p.Context, input.Key)
		if err != nil {
			return nil, err
		}

		return types.RedisRecord{
			Key:   input.Key,
			Type:  input.Type,
			Value: result,
		}, nil
	},
}
