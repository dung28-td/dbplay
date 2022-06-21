package schema

import (
	"github.com/dung28-td/dbplay/db"
	"github.com/dung28-td/dbplay/db/models"
	"github.com/dung28-td/dbplay/schema/inputs"
	"github.com/dung28-td/dbplay/x"
	"github.com/graphql-go/graphql"
)

var createConnection = graphql.Field{
	Type: connectionType,
	Args: graphql.FieldConfigArgument{
		"input": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(inputs.CreateConnectionInputObject),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		var input inputs.CreateConnectionInput
		if err := x.Bind(p.Args["input"], &input); err != nil {
			return nil, err
		}

		connection := models.Connection{
			Name: input.Name,
			DSN:  input.DSN,
		}

		_, err := db.DB.NewInsert().
			Model(&connection).
			Exec(p.Context)

		return connection, err
	},
}

var mutation = graphql.NewObject(graphql.ObjectConfig{
	Name: "RootMutation",
	Fields: graphql.Fields{
		"createConnection": &createConnection,
	},
})
