// A basic HTTP server.
// By default, it serves the current working directory on port 8080.
package main

// Reminder: The IDE might complain about a redundant main() function. Ignore it.
import (
	"flag"
	"log"
	"net/http"
)

var (
	listen = flag.String("listen", ":8080", "listen address")
	dir = flag.String("dir", "../pkg", "directory to serve")
)

func main() {
	flag.Parse()
	println( "Listening on port: %q...", *listen, )
	err := http.ListenAndServe( *listen, http.FileServer( http.Dir( *dir ) ), )
	log.Fatalln(err)
}







































