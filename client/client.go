package client

import (
	"context"
	"fmt"
	"net/url"
)

var Clients = make(map[string]Client)

type Client interface {
	TestConnection(ctx context.Context) error
	Close() error
	Tables(ctx context.Context) ([]TableSQL, error)
	Columns(ctx context.Context, schema string, name string) ([]ColumnSQL, error)
}

func NewClient(dsn string) (c Client, err error) {
	if c, ok := Clients[dsn]; ok {
		return c, nil
	}

	u, err := url.Parse(dsn)
	if err != nil {
		return nil, err
	}

	switch u.Scheme {
	case "redis", "rediss":
		c, err = NewClientRedis(dsn)
	case "postgres":
		if cp, err := NewCLientPostgres(dsn); err == nil {
			cp.Debug()
			c = cp
		}
	default:
		c, err = nil, fmt.Errorf("currently, %q connection is not supported", u.Scheme)
	}

	if c != nil {
		Clients[dsn] = c
	}

	return c, err
}

func CloseClient(dsn string) error {
	if c, ok := Clients[dsn]; ok {
		if err := c.Close(); err != nil {
			return err
		}
		delete(Clients, dsn)
	}
	return nil
}
