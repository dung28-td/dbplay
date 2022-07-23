package schema

import (
	"github.com/dung28-td/dbplay/schema/mutations"
	"github.com/graphql-go/graphql"
)

var mutation = graphql.NewObject(graphql.ObjectConfig{
	Name: "RootMutation",
	Fields: graphql.Fields{
		"createConnection":   &mutations.CreateConnection,
		"connect":            &mutations.Connect,
		"disconnect":         &mutations.Disconnect,
		"createRedisRecord":  &mutations.CreateRedisRecord,
		"updateRedisRecord":  &mutations.UpdateRedisRecord,
		"deleteRedisRecords": &mutations.DeleteRedisRecords,
		"execSQLQuery":       &mutations.ExecSQLQuery,
	},
})
