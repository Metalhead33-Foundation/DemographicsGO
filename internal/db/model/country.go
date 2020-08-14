package model

type CountryInput struct {
	Name string
}

type Country struct {
	Id int64
	CountryInput
}