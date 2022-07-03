import Box from '@mui/material/Box'
import List, { ListProps } from '@mui/material/List'
import InView from './InView'

interface Props extends ListProps {
  loadMore?: () => void
}

export default function InfiniteList({ loadMore, ...props }: Props) {
  return (
    <Box position='relative'>
      <List {...props} />
      {loadMore && (
        <InView
          position='absolute'
          bottom={48}
          onChange={inView => inView && loadMore()}
        />
      )}
    </Box>
  )
}