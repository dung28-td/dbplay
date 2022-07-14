package client

import (
	"context"
	"database/sql"

	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/pgdialect"
	"github.com/uptrace/bun/driver/pgdriver"
)

type ClientSQL struct {
	sqldb *sql.DB
	db    *bun.DB
}

func NewCLientSQL(dsn string) (*ClientSQL, error) {
	sqldb := sql.OpenDB(pgdriver.NewConnector(pgdriver.WithDSN(dsn)))
	db := bun.NewDB(sqldb, pgdialect.New())

	return &ClientSQL{
		sqldb: sqldb,
		db:    db,
	}, nil
}

func (c ClientSQL) TestConnection(ctx context.Context) error {
	return c.db.Ping()
}

func (c ClientSQL) Close() error {
	err := c.db.Close()
	if err != nil {
		return err
	}

	err = c.sqldb.Close()
	return err
}
