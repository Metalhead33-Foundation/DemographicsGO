package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"wod-go.sonck.nl/demographics/internal/db"

	"wod-go.sonck.nl/demographics/internal/db/model"
	"wod-go.sonck.nl/demographics/internal/graphql/generated"
)

func (r *mutationResolver) CreateCountry(ctx context.Context, input model.CountryInput) (*model.Country, error) {
	return r.Repository.CreateCountry(ctx, &input)
}

func (r *mutationResolver) UpdateCountry(ctx context.Context, id int64, input model.CountryInput) (*model.Country, error) {
	return r.Repository.UpdateCountry(ctx, id, &input)
}

func (r *mutationResolver) DeleteCountry(ctx context.Context, id int64) (*bool, error) {
	return db.IsDeleted(r.Repository.DeleteCountry(ctx, id))
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }
