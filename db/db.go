package db

import (
	"context"
	"database/sql"

	"github.com/dung28-td/dbplay/db/models"
	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/sqlitedialect"
	"github.com/uptrace/bun/driver/sqliteshim"
	"github.com/uptrace/bun/extra/bundebug"
)

var DB *bun.DB

func Config() (*sql.DB, error) {
	sqldb, err := sql.Open(sqliteshim.ShimName, "file:dbplay.s3db?cache=shared")
	if err != nil {
		return nil, err
	}

	DB = bun.NewDB(sqldb, sqlitedialect.New())
	DB.AddQueryHook(bundebug.NewQueryHook(
		bundebug.WithVerbose(true),
		bundebug.FromEnv("BUNDEBUG"),
	))

	return sqldb, nil
}

func Migrate(ctx context.Context) error {
	_, err := DB.NewCreateTable().
		IfNotExists().
		Model((*models.Connection)(nil)).
		Exec(ctx)
	return err
}
