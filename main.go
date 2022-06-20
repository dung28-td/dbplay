package main

import (
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/graphql", graphqlHandler)
	err := http.ListenAndServe(":8080", nil)
	log.Fatal(err)
}
