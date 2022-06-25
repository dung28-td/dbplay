package scalars

import (
	"github.com/graphql-go/graphql"
	"github.com/graphql-go/graphql/language/ast"
	"github.com/graphql-go/graphql/language/kinds"
)

func parseLiteral(valueAST ast.Value) any {
	kind := valueAST.GetKind()
	value := valueAST.GetValue()
	switch kind {
	case kinds.ObjectValue:
		var obj map[string]any
		for _, v := range value.([]*ast.ObjectField) {
			obj[v.Name.Value] = parseLiteral(v.Value)
		}
		return obj
	case kinds.ListValue:
		var list []any
		for _, v := range value.([]ast.Value) {
			list = append(list, parseLiteral(v))
		}
		return list
	default:
		return value
	}
}

var JsonType = graphql.NewScalar(graphql.ScalarConfig{
	Name: "JSON",
	Serialize: func(value interface{}) interface{} {
		return value
	},
	ParseValue: func(value interface{}) interface{} {
		return value
	},
	ParseLiteral: parseLiteral,
})
