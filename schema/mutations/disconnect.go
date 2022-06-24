package mutations

import (
	"github.com/dung28-td/dbplay/client"
	"github.com/dung28-td/dbplay/db"
	"github.com/dung28-td/dbplay/db/models"
	"github.com/dung28-td/dbplay/schema/types"
	"github.com/graphql-go/graphql"
)

var Disconnect = graphql.Field{
	Type: types.ConnectionType,
	Args: graphql.FieldConfigArgument{
		"connectionId": &graphql.ArgumentConfig{
			Type: graphql.ID,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		bc := new(models.Connection)
		if err := db.DB.NewSelect().
			Model(bc).
			Where("id = ?", p.Args["connectionId"]).
			Scan(p.Context); err != nil {
			return nil, err
		}

		if err := client.CloseClient(bc.DSN); err != nil {
			return nil, err
		}

		return types.ConvertBunModelToConnection(bc), nil
	},
}
