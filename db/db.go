package db

import (
	"context"
	"database/sql"
	"embed"
	"flag"
	"os"

	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/sqlitedialect"
	"github.com/uptrace/bun/driver/sqliteshim"
	"github.com/uptrace/bun/extra/bundebug"
	"github.com/uptrace/bun/migrate"
)

var DB *bun.DB
var debug = flag.Bool("dev", false, "enable development environment")

//go:embed migrations/*
var migrations embed.FS

func Config() (*sql.DB, error) {
	uhd, err := os.UserHomeDir()
	if err != nil {
		return nil, err
	}

	dsn := "file://" + uhd + "/.dbplay.s3db?cache=shared"
	if *debug {
		dsn = "file:dbplay.s3db?cache=shared"
	}
	sqldb, err := sql.Open(sqliteshim.ShimName, dsn)
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
	m := migrate.NewMigrations()

	if err := m.Discover(migrations); err != nil {
		return err
	}

	migrator := migrate.NewMigrator(DB, m)

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
