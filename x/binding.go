package x

import "encoding/json"

func Bind(data any, value any) error {
	d, err := json.Marshal(data)
	if err != nil {
		return err
	}

	return json.Unmarshal(d, value)
}
