package queries

import (
	"github.com/dung28-td/dbplay/constants"
	"github.com/dung28-td/dbplay/schema/types"
	"github.com/graphql-go/graphql"
)

var SQLTables = graphql.Field{
	Type: graphql.NewList(types.SQLTableType),
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		connection := p.Context.Value(constants.CurrentConnectionContextKey).(*types.Connection)

		return connection.Client.Tables(p.Context)
	},
}
