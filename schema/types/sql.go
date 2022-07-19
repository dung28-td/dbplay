package types

import (
	"github.com/dung28-td/dbplay/client"
	"github.com/dung28-td/dbplay/constants"
	"github.com/dung28-td/dbplay/schema/scalars"
	"github.com/dung28-td/dbplay/x"
	"github.com/graphql-go/graphql"
)

var SQLTableType = graphql.NewObject(graphql.ObjectConfig{
	Name: "SQLTable",
	Fields: graphql.Fields{
		"schema": &graphql.Field{
			Type: graphql.String,
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"columns": &graphql.Field{
			Type: graphql.NewList(SQLColumnType),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				src := p.Source.(client.TableSQL)
				connection := p.Context.Value(constants.CurrentConnectionContextKey).(*Connection)

				return connection.Client.Columns(p.Context, src.Schema, src.Name)
			},
		},
		"records": &graphql.Field{
			Type: SQLRecordsType,
			Args: graphql.FieldConfigArgument{
				"limit": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.Int),
				},
				"offset": &graphql.ArgumentConfig{
					Type: graphql.NewNonNull(graphql.Int),
				},
				"where": &graphql.ArgumentConfig{
					Type:         graphql.String,
					DefaultValue: "",
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				src := p.Source.(client.TableSQL)
				connection := p.Context.Value(constants.CurrentConnectionContextKey).(*Connection)
				db, _ := connection.Client.GetDB()

				builder := db.NewSelect().Table(src.Schema + "." + src.Name)
				where := p.Args["where"].(string)

				if where != "" {
					builder = builder.Where(where)
				}

				var r []map[string]any
				count, err := builder.
					Limit(p.Args["limit"].(int)).
					Offset(p.Args["offset"].(int)).
					ScanAndCount(p.Context, &r)

				if err != nil {
					return nil, err
				}

				x.ParseSQL(r)

				return SQLRecords{
					Rows:     r,
					RowCount: count,
				}, nil
			},
		},
	},
})

var SQLColumnType = graphql.NewObject(graphql.ObjectConfig{
	Name: "SQLColumn",
	Fields: graphql.Fields{
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"dataType": &graphql.Field{
			Type: graphql.String,
		},
	},
})

type SQLRecords struct {
	Rows     []map[string]any `json:"rows"`
	RowCount int              `json:"rowCount"`
}

var SQLRecordsType = graphql.NewObject(graphql.ObjectConfig{
	Name: "SQLRecords",
	Fields: graphql.Fields{
		"rows": &graphql.Field{
			Type: scalars.JsonType,
		},
		"rowCount": &graphql.Field{
			Type: graphql.Int,
		},
	},
})
