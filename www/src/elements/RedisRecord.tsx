import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import RedisRecordEditor from "components/RedisRecordEditor";
import useQuery from "hooks/useQuery";
import { useParams } from "react-router-dom";


export default function RedisRecord() {
  const { key } = useParams()
  const { loading, data } = useQuery('REDIS_VALUE', {
    variables: {
      key: key!
    }
  })

  if (loading) return (
    <Box bgcolor='background.monokai' display='flex' justifyContent='center' alignItems='center' height={1}>
      <CircularProgress />
    </Box>
  )

  if (!data?.redisValue) return null

  return (
    <RedisRecordEditor
      key={data.redisValue.key}
      record={data.redisValue}
    />
  )
}
