package inputs

import (
	"github.com/dung28-td/dbplay/schema/scalars"
	"github.com/dung28-td/dbplay/schema/types"
	"github.com/graphql-go/graphql"
)

var RedisRecordInputObject = graphql.NewInputObject(graphql.InputObjectConfig{
	Name: "RedisRecordInput",
	Fields: graphql.InputObjectConfigFieldMap{
		"key": &graphql.InputObjectFieldConfig{
			Type: graphql.ID,
		},
		"type": &graphql.InputObjectFieldConfig{
			Type: types.RedisRecordTypeEnum,
		},
		"value": &graphql.InputObjectFieldConfig{
			Type: scalars.JsonType,
		},
	},
})
