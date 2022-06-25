package types

import (
	"github.com/dung28-td/dbplay/schema/scalars"
	"github.com/graphql-go/graphql"
)

var RedisRecordTypeEnum = graphql.NewEnum(graphql.EnumConfig{
	Name: "RedisRecordType",
	Values: graphql.EnumValueConfigMap{
		"STRING": &graphql.EnumValueConfig{
			Value: "string",
		},
		"HASH": &graphql.EnumValueConfig{
			Value: "hash",
		},
		"LIST": &graphql.EnumValueConfig{
			Value: "list",
		},
		"SET": &graphql.EnumValueConfig{
			Value: "set",
		},
		"ZSET": &graphql.EnumValueConfig{
			Value: "zset",
		},
	},
})

type RedisRecord struct {
	Key   string `json:"key"`
	Type  string `json:"type"`
	Value any    `json:"value"`
}

var RedisRecordType = graphql.NewObject(graphql.ObjectConfig{
	Name: "RedisRecord",
	Fields: graphql.Fields{
		"key": &graphql.Field{
			Type: graphql.ID,
		},
		"type": &graphql.Field{
			Type: RedisRecordTypeEnum,
		},
		"value": &graphql.Field{
			Type: scalars.JsonType,
		},
	},
})
