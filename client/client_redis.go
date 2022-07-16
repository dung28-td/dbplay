package client

import (
	"context"
	"fmt"
	"time"

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

func (c *ClientRedis) TestConnection(ctx context.Context) error {
	_, err := c.Client.Ping(ctx).Result()
	return err
}

func (c *ClientRedis) Close() error {
	return c.Client.Close()
}

func (c *ClientRedis) Keys(ctx context.Context, input string) ([]string, error) {
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

func (c *ClientRedis) Get(ctx context.Context, key string) (any, error) {
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
		return nil, fmt.Errorf("currently we don't support redis %q type", t)
	}
}

func (c *ClientRedis) GetWithExpiration(ctx context.Context, key string) (any, *int64, error) {
	v, err := c.Get(ctx, key)
	if err != nil {
		return nil, nil, err
	}
	pttl, err := c.Client.PTTL(ctx, key).Result()
	if err != nil {
		return v, nil, err
	}

	if pttl.Milliseconds() == 0 {
		return v, nil, nil
	}

	e := pttl.Milliseconds() + time.Now().UnixMilli()
	return v, &e, nil
}

func (c *ClientRedis) Set(ctx context.Context, t string, k string, v any) error {
	switch t {
	case "string":
		return c.Client.Set(ctx, k, v, 0).Err()
	case "hash":
		return c.Client.HSet(ctx, k, v).Err()
	case "list":
		err := c.Client.Del(ctx, k).Err()
		if err != nil {
			return err
		}

		err = c.Client.RPush(ctx, k, v.([]any)...).Err()
		return err
	case "set":
		err := c.Client.Del(ctx, k).Err()
		if err != nil {
			return err
		}

		err = c.Client.SAdd(ctx, k, v.([]any)...).Err()
		return err
	case "zset":
		err := c.Client.Del(ctx, k).Err()
		if err != nil {
			return err
		}

		var values []redis.Z
		for _, item := range v.([]any) {
			z := item.(map[string]any)
			values = append(values, redis.Z{
				Score:  z["Score"].(float64),
				Member: z["Member"],
			})
		}

		err = c.Client.ZAdd(ctx, k, values...).Err()
		return err
	default:
		return fmt.Errorf("currently we don't support redis %q type", t)
	}
}

func (c *ClientRedis) SetWithExpiration(ctx context.Context, t string, k string, v any, e *int64) error {
	if err := c.Set(ctx, t, k, v); err != nil {
		return err
	}

	if e == nil {
		return nil
	}

	err := c.Client.PExpireAt(ctx, k, time.UnixMilli(*e)).Err()
	return err
}

func (c *ClientRedis) Tables(ctx context.Context) ([]TableSQL, error) {
	return nil, fmt.Errorf("client Redis does not support tables")
}
