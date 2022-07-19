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

	x.ParseSQL(t)

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
			Name:   v.Name,
			Schema: v.Schema,
		})
	}

	return r, nil
}

type ColumnPostgres struct {
	Name     string `json:"column_name"`
	DataType string `json:"data_type"`
}

func (c *ClientPostgres) Columns(ctx context.Context, s string, n string) ([]ColumnSQL, error) {
	var cols []map[string]any
	if err := c.db.NewSelect().
		TableExpr("information_schema.columns").
		Where("table_schema = ?", s).
		Where("table_name = ?", n).
		Scan(ctx, &cols); err != nil {
		return nil, err
	}

	x.ParseSQL(cols)

	// col's attributes
	//
	// character_maximum_length: null
	// character_octet_length: null
	// character_set_catalog: null
	// character_set_name: null
	// character_set_schema: null
	// collation_catalog: null
	// collation_name: null
	// collation_schema: null
	// column_default: "nextval('\"Loan_id_seq\"'::regclass)"
	// column_name: "aWQ="
	// data_type: "integer"
	// datetime_precision: null
	// domain_catalog: null
	// domain_name: null
	// domain_schema: null
	// dtd_identifier: "MQ=="
	// generation_expression: null
	// identity_cycle: "NO"
	// identity_generation: null
	// identity_increment: null
	// identity_maximum: null
	// identity_minimum: null
	// identity_start: null
	// interval_precision: null
	// interval_type: null
	// is_generated: "NEVER"
	// is_identity: "NO"
	// is_nullable: "NO"
	// is_self_referencing: "NO"
	// is_updatable: "YES"
	// maximum_cardinality: null
	// numeric_precision: 32
	// numeric_precision_radix: 2
	// numeric_scale: 0
	// ordinal_position: 1
	// scope_catalog: null
	// scope_name: null
	// scope_schema: null
	// table_catalog: "Z28tZHV0Y2g="
	// table_name: "TG9hbg=="
	// table_schema: "cHVibGlj"
	// udt_catalog: "Z28tZHV0Y2g="
	// udt_name: "aW50NA=="
	// udt_schema: "cGdfY2F0YWxvZw=="

	var cp []ColumnPostgres
	if err := x.Bind(cols, &cp); err != nil {
		return nil, err
	}

	var r []ColumnSQL
	for _, v := range cp {
		r = append(r, ColumnSQL{
			Name:     v.Name,
			DataType: v.DataType,
		})
	}

	return r, nil
}
