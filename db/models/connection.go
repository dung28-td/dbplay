package models

type Connection struct {
	ID   int64  `bun:"id,pk,autoincrement"`
	Name string `bun:"name"`
	DSN  string `bun:"dsn,notnull,unique"`
}
