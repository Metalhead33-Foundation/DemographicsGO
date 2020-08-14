package connection

import (
	"context"
	"fmt"
	"github.com/go-pg/pg/v10"
	"github.com/spf13/viper"
)

type Options struct {
	pg.Options
	Role string
}

var (
	conn     *pg.DB
	opts     *Options
	optsChan chan *Options
	connChan chan *pg.DB
)

func init() {
	optsChan = make(chan *Options, 1)
	connChan = make(chan *pg.DB, 0)
	go func() {
		for {
			newOpts := <-optsChan

			if opts == nil ||
				opts.Network != newOpts.Network ||
				opts.Addr != newOpts.Addr ||
				opts.User != newOpts.User ||
				opts.Password != newOpts.Password ||
				opts.Database != newOpts.Database ||
				opts.ApplicationName != newOpts.ApplicationName ||
				opts.Role != newOpts.Role {
				opts = newOpts
				opts.OnConnect = func(ctx context.Context, cn *pg.Conn) error {
					_, err := cn.Exec("SET ROLE ?; SET search_path = demographics;", opts.Role)
					return err
				}
				conn = nil
			}
			if conn == nil {
				conn = pg.Connect(&opts.Options)
			}

			connChan <- conn
		}
	}()
}

//GetDB returns the database to use according to the configuration from viper
func GetDB() (*pg.DB, error) {
	dbViper := viper.Sub("db")

	if dbViper == nil {
		return nil, fmt.Errorf("db not configured")
	}

	optsChan <- &Options{
		Options: pg.Options{
			Network:         dbViper.GetString("network"),
			Addr:            dbViper.GetString("address"),
			User:            dbViper.GetString("user"),
			Password:        dbViper.GetString("password"),
			Database:        dbViper.GetString("database"),
			ApplicationName: dbViper.GetString("application_name"),
			TLSConfig:       nil,
			PoolSize:        4,
		},
		Role: dbViper.GetString("role"),
	}

	return <-connChan, nil
}
