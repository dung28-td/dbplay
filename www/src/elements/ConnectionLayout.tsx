import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import CircularProgress from '@mui/material/CircularProgress'
import { Outlet, useParams } from "react-router-dom";
import useQuery from "hooks/useQuery";
import ConnectionOrigin from "components/ConnectionOrigin";
import { Fragment, useMemo } from 'react'
import { generateApolloClient } from 'lib/apollo'
import { ApolloProvider } from '@apollo/client'
import useDSN from 'hooks/useDSN'
import { CONNECTION_TYPES } from 'constants/index'

const appbarSx: Sx = {
  borderBottom: 1,
  borderColor: 'divider'
}

export default function ConnectionLayout() {
  const { id } = useParams()
  const { loading, data } = useQuery('CONNECTION', {
    fetchPolicy: 'cache-and-network',
    variables: {
      connectionId: id!
    }
  })

  return (
    <Stack height={1}>
      <AppBar color='transparent' position="relative" elevation={0} sx={appbarSx}>
        <Toolbar>
          <Box flexGrow={1}>
            <Stack>
              <Typography variant="h6" component='h1'>
                {loading
                  ? <Skeleton />
                  : data?.connection?.name
                }
              </Typography>
              <Typography variant="body2">
                {loading
                  ? <Skeleton />
                  : <ConnectionOrigin dsn={data?.connection?.dsn || ''} />
                }
              </Typography>
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
      <Box flexGrow={1}>
        {loading && (
          <Stack height={1} justifyContent='center' alignItems='center'>
            <CircularProgress size={40} />
          </Stack>
        )}
        {!loading && data?.connection?.connected && (
          <MainLayout connection={data.connection} />
        )}
      </Box>
    </Stack>
  )
}

interface MainLayoutProps {
  connection: CoreConnectionFields
}

function MainLayout({ connection }: MainLayoutProps) {
  const { id, dsn } = connection
  const match = useDSN(dsn)
  const connectionClient = useMemo(() => generateApolloClient(id), [id])
  const Layout =
    match?.scheme &&
    match.scheme in CONNECTION_TYPES &&
    CONNECTION_TYPES[match.scheme as keyof typeof CONNECTION_TYPES].Layout ||
    Fragment

  return (
    <ApolloProvider client={connectionClient}>
      <Layout>
        <Outlet />
      </Layout>
    </ApolloProvider>
  )
}