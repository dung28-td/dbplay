package main

import (
	"context"
	"embed"
	"flag"
	"fmt"
	"log"
	"net/http"

	"github.com/dung28-td/dbplay/db"
)

var port = flag.String("p", "8808", "port")

//go:embed public/*
var content embed.FS

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

	fs := http.FileServer(http.FS(content))
	mux.Handle("/public/", fs)
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		html, err := content.ReadFile("public/index.html")
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		w.Write(html)
	})

	fmt.Printf("dbplay started successfully! You can now visit the playground at http://localhost:%s\n", *port)

	log.Fatal(http.ListenAndServe(":"+*port, mux))
}
