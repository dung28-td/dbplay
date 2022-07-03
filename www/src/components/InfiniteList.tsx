import CircularProgress from '@mui/material/CircularProgress'
import List, { ListProps } from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import InView from './InView'

interface Props extends ListProps {
  loading?: boolean
  loadMore?: () => void
  LoadingComponent?: React.ComponentType
}

export default function InfiniteList({
  loading,
  loadMore,
  LoadingComponent = Loading,
  children,
  ...props
}: Props) {
  return (
    <List
      {...props}
      sx={{
        position: 'relative',
        ...props.sx
      }}
    >
      {children}
      {loading && <LoadingComponent />}
      {!loading && loadMore && (
        <InView
          component='li'
          position='absolute'
          bottom={48}
          onChange={inView => inView && loadMore()}
        />
      )}
    </List>
  )
}

function Loading() {
  return (
    <ListItem sx={{ justifyContent: 'center' }}>
      <CircularProgress />
    </ListItem>
  )
}