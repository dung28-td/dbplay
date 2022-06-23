package client

import (
	"context"
	"fmt"
	"net/url"
)

var Clients map[string]Client

type Client interface {
	TestConnection(ctx context.Context) error
	Close() error
}

func NewClient(dsn string) (Client, error) {
	u, err := url.Parse(dsn)
	if err != nil {
		return nil, err
	}

	switch u.Scheme {
	case "redis", "rediss", "unix":
		return NewClientRedis(dsn)
	default:
		return nil, fmt.Errorf("currently we don't support \"%s\" DB", u.Scheme)
	}
}
