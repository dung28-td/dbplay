import RedisRecordEditor from "components/RedisRecordEditor";
import useMutation from "hooks/useMutation";
import { useNavigate, useParams } from "react-router-dom";

export default function NewRedisRecord() {
  const { connectionId } = useParams()
  const navigate = useNavigate()
  const [createRedisRecord, { loading }] = useMutation('CREATE_REDIS_RECORD', {
    onCompleted(data) {
      if (!data.createRedisRecord) return
      navigate(`/connections/${connectionId}/records/${data.createRedisRecord.key}`)
    },
    update(cache) {
      cache.modify({
        fields: {
          redisKeys(_, { DELETE }) {
            return DELETE
          }
        }
      })
    }
  })

  return (
    <RedisRecordEditor
      loading={loading}
      onSave={input => createRedisRecord({
        variables: { input }
      })}
    />
  )
}
