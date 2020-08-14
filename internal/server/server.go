package server

import (
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"wod-go.sonck.nl/demographics/internal/db/connection"
	"wod-go.sonck.nl/demographics/internal/db/repository"
	"wod-go.sonck.nl/demographics/internal/graphql/generated"
	"wod-go.sonck.nl/demographics/internal/graphql/resolver"
)

type server struct {
	logger *zap.Logger
}

func graphqlHandler() (gin.HandlerFunc, error) {
	db, err := connection.GetDB()
	if err != nil {
		return nil, err
	}

	h := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &resolver.Resolver{
		Repository: (*repository.Repository)(db),
	}}))

	return func(c *gin.Context) {
		h.ServeHTTP(c.Writer, c.Request)
	}, nil
}

func Make() (*gin.Engine, error) {
	r := gin.Default()

	h, err := graphqlHandler()
	if err != nil {
		return nil, err
	}
	r.POST("/graphql", h)
	r.Static("/static", "./assets/static")
	r.StaticFile("/", "assets/index.html")
	r.NoRoute(func(c *gin.Context) {
		c.File("./assets/index.html")
	})
	return r, nil
}
