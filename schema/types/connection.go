package types

import (
	"github.com/dung28-td/dbplay/client"
	"github.com/dung28-td/dbplay/db/models"
	"github.com/graphql-go/graphql"
)

type Connection struct {
	ID        int64   `json:"id"`
	Name      *string `json:"name"`
	DSN       string  `json:"dsn"`
	Connected bool    `json:"connected"`
}

var ConnectionType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Connection",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.ID,
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"dsn": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
		},
		"connected": &graphql.Field{
			Type: graphql.NewNonNull(graphql.Boolean),
		},
	},
})

func ConvertBunModelToConnection(v *models.Connection) Connection {
	c := Connection{
		ID:        v.ID,
		Name:      v.Name,
		DSN:       v.DSN,
		Connected: false,
	}
	if _, ok := client.Clients[v.DSN]; ok {
		c.Connected = true
	}

	return c
}
