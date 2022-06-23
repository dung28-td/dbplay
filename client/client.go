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
}

func NewClient(dsn string) (c Client, err error) {
	u, err := url.Parse(dsn)
	if err != nil {
		return nil, err
	}

	switch u.Scheme {
	case "redis", "rediss", "unix":
		c, err = NewClientRedis(dsn)
	default:
		c, err = nil, fmt.Errorf("currently we don't support \"%s\" DB", u.Scheme)
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
		return nil
	} else {
		return fmt.Errorf("could not found connection with DSN: %s", dsn)
	}
}
