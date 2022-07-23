package mutations

import (
	"github.com/dung28-td/dbplay/constants"
	"github.com/dung28-td/dbplay/schema/scalars"
	"github.com/dung28-td/dbplay/schema/types"
	"github.com/graphql-go/graphql"
)

var ExecSQLQuery = graphql.Field{
	Type: scalars.JsonType,
	Args: graphql.FieldConfigArgument{
		"query": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		connection := p.Context.Value(constants.CurrentConnectionContextKey).(*types.Connection)
		db, err := connection.Client.GetDB()
		if err != nil {
			return nil, err
		}

		rows, err := db.QueryContext(p.Context, p.Args["query"].(string))
		if err != nil {
			return nil, err
		}

		var r []map[string]any
		err = db.ScanRows(p.Context, rows, &r)

		return r, err
	},
}
