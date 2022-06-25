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

func (c ClientRedis) Value(ctx context.Context, key string) (any, error) {
	t, err := c.Client.Type(ctx, key).Result()
	if err != nil {
		return nil, err
	}

	switch t {
	case "string":
		return c.Client.Get(ctx, key).Result()
	case "hash":
		return c.Client.HGetAll(ctx, key).Result()
	case "list":
		return c.Client.LRange(ctx, key, 0, -1).Result()
	case "set":
		return c.Client.SMembers(ctx, key).Result()
	case "zset":
		return c.Client.ZRangeWithScores(ctx, key, 0, -1).Result()
	default:
		return nil, fmt.Errorf("currently we don't support redis \"%s\" type", t)
	}
}
