package internal

import (
	"fmt"
	"runtime"
)

var (
	version string

	VersionText = fmt.Sprintf("v%s", version)

	GoVersionText = runtime.Version()
)