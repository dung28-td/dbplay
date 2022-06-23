package client

import (
	"context"

	"github.com/go-redis/redis/v9"
)

type ClientRedis struct {
	Client *redis.Client
}

func NewClientRedis(dsn string) (*ClientRedis, error) {
	opt, err := redis.ParseURL(dsn)
	if err != nil {
		return nil, err
	}

	return &ClientRedis{
		Client: redis.NewClient(opt),
	}, nil
}

func (c ClientRedis) TestConnection(ctx context.Context) error {
	_, err := c.Client.Ping(ctx).Result()
	return err
}

func (c ClientRedis) Close() error {
	return c.Client.Close()
}
