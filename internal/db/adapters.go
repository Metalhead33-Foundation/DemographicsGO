package db

func IsDeleted(deleted bool, err error) (*bool, error) {
	if err != nil {
		return nil, err
	}
	return &deleted, nil
}
