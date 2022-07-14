package x

func Map[E any, R any](s []E, f func(E) R) []R {
	var r []R
	for _, v := range s {
		r = append(r, f(v))
	}
	return r
}
