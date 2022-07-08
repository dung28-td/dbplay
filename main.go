package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net/http"

	"github.com/dung28-td/dbplay/db"
)

var port = flag.String("p", "8808", "port")

func main() {
	flag.Parse()

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

	mux := http.NewServeMux()

	mux.HandleFunc("/graphql", graphqlHandler)

	fs := http.FileServer(http.Dir("public"))
	mux.Handle("/public/", http.StripPrefix("/public/", fs))
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "public/index.html")
	})

	fmt.Printf("dbplay started successfully! You can now visit the playground at http://localhost:%s\n", *port)

	log.Fatal(http.ListenAndServe(":"+*port, mux))
}
