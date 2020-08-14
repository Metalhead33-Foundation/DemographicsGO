package migration

import (
	"fmt"
	"github.com/go-pg/migrations/v8"
)

func init() {
	migrations.MustRegisterTx(v1Up, v1Down)
}

func v1Up(db migrations.DB) error {
	/* language=PostgreSQL */
	_, err := db.Exec(`
CREATE SCHEMA demographics;
`)
	if err != nil {
		return fmt.Errorf("failed to run query: %w", err)
	}
	return nil
}

func v1Down(db migrations.DB) error {
	/* language=PostgreSQL */
	_, err := db.Exec(`
DROP SCHEMA demographics;
`)
	if err != nil {
		return fmt.Errorf("failed to run query: %w", err)
	}
	return nil
}
