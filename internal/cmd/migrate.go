/*
Copyright © 2020 Daniel Sonck <daniel@sonck.nl>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.
*/
package cmd

import (
	"fmt"
	"os"
	"wod-go.sonck.nl/demographics/internal/db/migration"
	"github.com/spf13/cobra"
)

// migrateCmd represents the migrate command
var migrateCmd = &cobra.Command{
	Use:   "migrate [version|up|down]",
	Short: "Perform database migrations",
	Long: `Migrate is a command to perform the database migrations required to make this daemon work. The possible commands are:

- version: prints the version of the database
- up|down: perform the migration
- init: create the initial version table`,
	Run: func(cmd *cobra.Command, args []string) {
		err := migration.Migrate(args)
		if err != nil {
			_, _ = fmt.Fprintln(os.Stderr, "Failed to perform migration:", err.Error())
		}
	},
}

func init() {
	rootCmd.AddCommand(migrateCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// migrateCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// migrateCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
