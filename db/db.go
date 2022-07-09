package db

import (
	"context"
	"database/sql"
	"flag"

	"github.com/dung28-td/dbplay/db/migrations"
	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/sqlitedialect"
	"github.com/uptrace/bun/driver/sqliteshim"
	"github.com/uptrace/bun/extra/bundebug"
	"github.com/uptrace/bun/migrate"
)

var DB *bun.DB
var debug = flag.Bool("dev", false, "enable development environment")

func Config() (*sql.DB, error) {
	sqldb, err := sql.Open(sqliteshim.ShimName, "file:dbplay.s3db?cache=shared")
	if err != nil {
		return nil, err
	}

	DB = bun.NewDB(sqldb, sqlitedialect.New())

	if *debug {
		DB.AddQueryHook(bundebug.NewQueryHook(
			bundebug.WithVerbose(true),
			bundebug.FromEnv("BUNDEBUG"),
		))
	}

	return sqldb, nil
}

func Migrate(ctx context.Context) error {
	migrator := migrate.NewMigrator(DB, migrations.Migrations)

	// create migrations tables
	if err := migrator.Init(ctx); err != nil {
		return err
	}

	// apply migrations
	if _, err := migrator.Migrate(ctx); err != nil {
		return err
	}

	return nil
}
