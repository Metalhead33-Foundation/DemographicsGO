package resolver

import "wod-go.sonck.nl/demographics/internal/db/repository"

//go:generate go run github.com/99designs/gqlgen

type Resolver struct {
	*repository.Repository
}