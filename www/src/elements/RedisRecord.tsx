import { StoreObject } from "@apollo/client";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import RedisRecordEditor from "components/RedisRecordEditor";
import useMutation from "hooks/useMutation";
import useQuery from "hooks/useQuery";
import { useNavigate, useParams } from "react-router-dom";

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

  return <EditRedisRecord record={data.redisValue} />
}

interface EditRedisRecordProps {
  record: CoreRedisRecordFields
}

function EditRedisRecord({ record }: EditRedisRecordProps) {
  const { connectionId, key } = useParams()
  const navigate = useNavigate()
  const [updateRedisRecord, { loading }] = useMutation('UPDATE_REDIS_RECORD', {
    onCompleted(data) {
      if (!data.updateRedisRecord) return
      navigate(`/connections/${connectionId}/records/${data.updateRedisRecord.key}`, {
        replace: true
      })
    },
    update(cache, { data }) {
      if (data?.updateRedisRecord && data.updateRedisRecord.key !== key) {
        cache.evict({
          id: cache.identify(record as unknown as StoreObject)
        })
        cache.modify({
          fields: {
            redisKeys(_, { DELETE }) {
              return DELETE
            }
          }
        })
      }
    }
  })
  const [deleteRedisRecords] = useMutation('DELETE_REDIS_RECORDS', {
    variables: {
      keys: [key!]
    },
    onCompleted(data) {
      if (!data.deleteRedisRecords) return
      navigate(`/connections/${connectionId}`, {
        replace: true
      })
    },
    update(cache) {
      cache.evict({
        id: cache.identify(record as unknown as StoreObject)
      })
    }
  })

  if (!key) return null

  const { __typename, ...redisRecord } = record

  return (
    <RedisRecordEditor
      key={record.key}
      loading={loading}
      record={redisRecord}
      onDelete={deleteRedisRecords}
      onSave={input => updateRedisRecord({
        variables: {
          key,
          input
        }
      })}
    />
  )
}