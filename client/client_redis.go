package client

import (
	"context"
	"fmt"

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

func (c ClientRedis) Keys(ctx context.Context, input string) ([]string, error) {
	var result []string
	match := input
	if match != "" {
		match = ("*" + match + "*")
	}
	iter := c.Client.Scan(ctx, 0, match, 0).Iterator()
	for iter.Next(ctx) {
		result = append(result, iter.Val())
	}
	return result, iter.Err()
}

func (c ClientRedis) Value(ctx context.Context, key string) (string, error) {
	t, err := c.Client.Type(ctx, key).Result()
	if err != nil {
		return "", err
	}
	fmt.Println(t)
	return c.Client.Get(ctx, key).Result()
}
