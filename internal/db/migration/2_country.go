package migration

import (
	"fmt"
	"github.com/go-pg/migrations/v8"
)

func init() {
	migrations.MustRegisterTx(v2Up, v2Down)
}

func v2Up(db migrations.DB) error {
	/* language=PostgreSQL */
	_, err := db.Exec(`
CREATE TABLE demographics.countries (
	id BIGSERIAL PRIMARY KEY,
	name TEXT
)
;
`)
	if err != nil {
		return fmt.Errorf("failed to run query: %w", err)
	}
	return nil
}

func v2Down(db migrations.DB) error {
	/* language=PostgreSQL */
	_, err := db.Exec(`
DROP TABLE demographics.countries;
`)
	if err != nil {
		return fmt.Errorf("failed to run query: %w", err)
	}
	return nil
}
