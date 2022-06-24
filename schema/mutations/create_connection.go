package mutations

import (
	"github.com/dung28-td/dbplay/client"
	"github.com/dung28-td/dbplay/db"
	"github.com/dung28-td/dbplay/db/models"
	"github.com/dung28-td/dbplay/schema/inputs"
	"github.com/dung28-td/dbplay/schema/types"
	"github.com/dung28-td/dbplay/x"
	"github.com/graphql-go/graphql"
)

var CreateConnection = graphql.Field{
	Type: types.ConnectionType,
	Args: graphql.FieldConfigArgument{
		"input": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(inputs.CreateConnectionInputObject),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		var input inputs.CreateConnectionInput
		if err := x.Bind(p.Args["input"], &input); err != nil {
			return nil, err
		}

		if c, err := client.NewClient(input.DSN); err != nil {
			return nil, err
		} else {
			if err = c.TestConnection(p.Context); err != nil {
				return nil, err
			}
		}

		bc := models.Connection{
			Name: input.Name,
			DSN:  input.DSN,
		}

		_, err := db.DB.NewInsert().
			Model(&bc).
			Exec(p.Context)

		return types.ConvertBunModelToConnection(&bc), err
	},
}
