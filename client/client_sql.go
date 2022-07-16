package client

import (
	"context"
	"database/sql"

	"github.com/uptrace/bun"
	"github.com/uptrace/bun/extra/bundebug"
)

type ClientSQL struct {
	sqldb *sql.DB
	db    *bun.DB
}

type TableSQL struct {
	Name    string      `json:"name"`
	Schema  string      `json:"schema"`
	Columns []ColumnSQL `json:"columns"`
}

type ColumnSQL struct {
	Name     string `json:"name"`
	DataType string `json:"dataType"`
}

func (c *ClientSQL) Debug() {
	c.db.AddQueryHook(bundebug.NewQueryHook(
		bundebug.WithVerbose(true),
		bundebug.FromEnv("BUNDEBUG"),
	))
}

func (c *ClientSQL) TestConnection(ctx context.Context) error {
	return c.db.Ping()
}

func (c *ClientSQL) Close() error {
	err := c.db.Close()
	if err != nil {
		return err
	}

	err = c.sqldb.Close()
	return err
}
