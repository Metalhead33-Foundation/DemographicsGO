package repository

import (
	"context"
	"fmt"
	"wod-go.sonck.nl/demographics/internal/db/model"
)

func (r *Repository) GetCountries(ctx context.Context) ([]model.Country, error) {
	var countries []model.Country

	err := r.ModelContext(ctx, &countries).Select()
	if err != nil {
		return nil, fmt.Errorf("failed to get countries: %w", err)
	}

	return countries, nil
}

func (r *Repository) CreateCountry(ctx context.Context, data *model.CountryInput) (*model.Country, error) {
	country := model.Country{
		CountryInput: *data,
	}

	_, err := r.ModelContext(ctx, &country).Insert()
	if err != nil {
		return nil, fmt.Errorf("failed to create country: %w", err)
	}

	return &country, nil
}

func (r *Repository) GetCountry(ctx context.Context, id int64) (*model.Country, error) {
	var countrys []model.Country

	err := r.ModelContext(ctx, &countrys).Where("id = ?", id).Select()
	if err != nil {
		return nil, fmt.Errorf("failed to get country (%d): %w", id, err)
	}

	if len(countrys) == 0 {
		return nil, fmt.Errorf("country (%d) not found", id)
	}

	return &countrys[0], nil
}

func (r *Repository) UpdateCountry(ctx context.Context, id int64, data *model.CountryInput) (*model.Country, error) {
	country, err := r.GetCountry(ctx, id)
	if err != nil {
		return nil, fmt.Errorf("failed to update country: %w", err)
	}

	country.CountryInput = *data

	_, err = r.Model(country).WherePK().Update()
	if err != nil {
		return nil, fmt.Errorf("failed to update country (%d): %w", id, err)
	}

	return country, nil
}

func (r *Repository) DeleteCountry(ctx context.Context, id int64) (bool, error) {
	res, err := r.ModelContext(ctx, &model.Country{Id: id}).WherePK().Delete()
	if err != nil {
		return false, fmt.Errorf("failed to delete country (%d): %w", id, err)
	}
	return res.RowsAffected() > 0, nil
}