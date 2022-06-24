package schema

import (
	"github.com/dung28-td/dbplay/schema/queries"
	"github.com/graphql-go/graphql"
)

var query = graphql.NewObject(graphql.ObjectConfig{
	Name: "RootQuery",
	Fields: graphql.Fields{
		"connections": &queries.Connections,
		"redisKeys":   &queries.RedisKeys,
		"redisValue":  &queries.RedisValue,
	},
})
