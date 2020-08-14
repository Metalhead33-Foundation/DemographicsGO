package migration

import (
	"fmt"
	"github.com/go-pg/migrations/v8"
	"wod-go.sonck.nl/demographics/internal/db/connection"
)


func Migrate(args []string) error {
	ownDb, err := connection.GetDB()
	if err != nil {
		return fmt.Errorf("failed to get database: %w", err)
	}

	oldVersion, newVersion, err := migrations.Run(ownDb, args...)
	if err != nil {
		return fmt.Errorf("failed to migrate: %w", err)
	}

	if oldVersion != newVersion {
		fmt.Printf("migrated from version %[1]d to %[2]d\n", oldVersion, newVersion)
	} else {
		fmt.Printf("version is %[1]d\n", oldVersion)
	}

	return nil
}
