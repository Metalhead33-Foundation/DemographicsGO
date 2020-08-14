package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"wod-go.sonck.nl/demographics/internal"
	"wod-go.sonck.nl/demographics/internal/db/model"
	"wod-go.sonck.nl/demographics/internal/graphql/generated"
)

func (r *queryResolver) Version(ctx context.Context) (string, error) {
	return fmt.Sprintf("%s (%s)", internal.VersionText, internal.GoVersionText), nil
}

func (r *queryResolver) Countries(ctx context.Context) ([]model.Country, error) {
	return r.GetCountries(ctx)
}

func (r *queryResolver) Country(ctx context.Context, id int64) (*model.Country, error) {
	return r.GetCountry(ctx, id)
}

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
