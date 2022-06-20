package main

import (
	"context"
	"log"
	"net/http"

	"github.com/dung28-td/dbplay/db"
)

func main() {
	sqldb, err := db.Config()
	if err != nil {
		log.Fatal(err)
	}
	defer sqldb.Close()
	defer db.DB.Close()

	ctx := context.Background()

	err = db.Migrate(ctx)
	if err != nil {
		panic(err)
	}

	http.HandleFunc("/graphql", graphqlHandler)

	log.Fatal(http.ListenAndServe(":8080", nil))
}
