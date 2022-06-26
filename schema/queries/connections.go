package queries

import (
	"github.com/dung28-td/dbplay/db"
	"github.com/dung28-td/dbplay/db/models"
	"github.com/dung28-td/dbplay/schema/types"
	"github.com/graphql-go/graphql"
)

var Connections = graphql.Field{
	Type: graphql.NewList(types.ConnectionType),
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		var bunConnections []models.Connection

		if err := db.DB.NewSelect().
			Model(&bunConnections).
			Scan(p.Context); err != nil {
			return nil, err
		}
		var connections []*types.Connection

		for _, bc := range bunConnections {
			connections = append(connections, types.ConvertBunModelToConnection(&bc))
		}

		return connections, nil
	},
}
