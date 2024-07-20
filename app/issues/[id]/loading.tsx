import { Blockquote, Box } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingIssueDetailPage = () => {
  return (
    <Box className='max-w-xl'>
    <Skeleton/>

    <div className="flex flex-row space-x-5 mb-5">
      <Skeleton width="5rem"/>
      <Skeleton width="8rem"/>
    </div>

    <Blockquote className='prose bg-slate-100 p-5'>
      <Skeleton count={3}/>
    </Blockquote> 
  </Box>
  )
}

export default LoadingIssueDetailPage