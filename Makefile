all: build

migrate: .db-migrate

.db-migrate: .db-init
	bin/demographics migrate up | tee .db-migrate

migrate-init: .db-init

.db-init: bin/demographics
	bin/demographics migrate init | tee .db-init

start: .db-migrate
	bin/demographics start

build: bin/demographics

test: target/tests/report.xml target/site/clover/clover.xml

bin/go-junit-report: go.mod
	@echo building go-junit-report
	go build -o $@ github.com/jstemmer/go-junit-report

bin/go-clover: go.mod
	@echo building go-cover
	go build -o $@ github.com/codeofthrone/goclover

bin/demographics: target/tests/report.txt
	go build -o $@ .

target/tests/report.txt target/tests/coverage.out &: $(shell find -name '*.go' | sed 's! !\ !g')
	mkdir -p $(dir $@)
	go test -coverprofile=target/tests/coverage.out ./... -v 2>&1 > target/tests/report.txt

target/tests/report.xml: target/tests/report.txt bin/go-junit-report
	mkdir -p $(dir $@)
	bin/go-junit-report < $< > $@

target/site/clover/clover.xml: target/tests/coverage.out bin/go-clover
	mkdir -p $(dir $@)
	bin/go-clover -f $< -o $@