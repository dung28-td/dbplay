package x

import "encoding/base64"

func Atob(s string) string {
	v, _ := base64.StdEncoding.DecodeString(s)
	return string(v)
}
