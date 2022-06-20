package schema

import (
	"github.com/dung28-td/dbplay/db"
	"github.com/dung28-td/dbplay/db/models"
	"github.com/graphql-go/graphql"
)

var connections = graphql.Field{
	Type: graphql.NewList(connectionType),
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		var connections []models.Connection

		if err := db.DB.NewSelect().
			Model(&connections).
			Scan(p.Context); err != nil {
			return nil, err
		}

		return connections, nil
	},
}

var query = graphql.NewObject(graphql.ObjectConfig{
	Name: "RootQuery",
	Fields: graphql.Fields{
		"connections": &connections,
	},
})
