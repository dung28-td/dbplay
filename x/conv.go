package x

func ParseSQL(r []map[string]any) {
	for i, record := range r {
		for k, v := range record {
			if s, ok := v.([]byte); ok {
				r[i][k] = string(s)
			}
		}
	}
}
