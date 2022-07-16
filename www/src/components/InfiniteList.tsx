import List, { ListProps } from '@mui/material/List'
import InView from './InView'
import ListItemLoading from './ListItemLoading'

interface Props extends ListProps {
  loading?: boolean
  loadMore?: () => void
  LoadingComponent?: React.ComponentType
}

export default function InfiniteList({
  loading,
  loadMore,
  LoadingComponent = ListItemLoading,
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