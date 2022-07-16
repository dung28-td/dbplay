package client

import (
	"context"
	"database/sql"

	"github.com/dung28-td/dbplay/x"
	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/pgdialect"
	"github.com/uptrace/bun/driver/pgdriver"
)

type ClientPostgres struct {
	*ClientSQL
}

func NewCLientPostgres(dsn string) (*ClientPostgres, error) {
	sqldb := sql.OpenDB(pgdriver.NewConnector(pgdriver.WithDSN(dsn)))
	db := bun.NewDB(sqldb, pgdialect.New())

	return &ClientPostgres{
		ClientSQL: &ClientSQL{
			sqldb: sqldb,
			db:    db,
		},
	}, nil
}

type TablePostgres struct {
	Name   string `json:"tablename"`
	Schema string `json:"schemaname"`
}

func (c *ClientPostgres) Tables(ctx context.Context) ([]TableSQL, error) {
	var t []map[string]any
	if err := c.db.NewSelect().
		TableExpr("pg_catalog.pg_tables").
		Where("schemaname != ?", "pg_catalog").
		Where("schemaname != ?", "information_schema").
		Scan(ctx, &t); err != nil {
		return nil, err
	}

	// t's attributes
	//
	// hasindexes: true
	// hasrules: false
	// hastriggers: false
	// rowsecurity: false
	// schemaname: [112 117 98 108 105 99]
	// tablename: [76 111 97 110]
	// tableowner: [108 97 112 49 53 48 54 56 45 108 111 99 97 108]
	// tablespace: <nil>

	var tp []TablePostgres
	if err := x.Bind(t, &tp); err != nil {
		return nil, err
	}

	var r []TableSQL
	for _, v := range tp {
		r = append(r, TableSQL{
			Name:   x.Atob(v.Name),
			Schema: x.Atob(v.Schema),
		})
	}

	return r, nil
}
