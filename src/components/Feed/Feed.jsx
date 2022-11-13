import React from 'react'
import Post from '../Post/Post'
import Skeleton from '../Post/Skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, fetchDeletePost } from '../../Redux/slices/postSlice'
 const Feed = () => {
  const isLoaded = useSelector(state=> {
    if(state.post.data && state.post.data.length > 1) return true
  })
  const {sortProps, searchProps} = useSelector(state=> state.post.filter)
  const dispatch = useDispatch()
  const data = useSelector(state=> state.post.data)
  
  React.useEffect(()=> {
      dispatch(fetchPosts({sortProps, searchProps}))
  }, [sortProps, searchProps])
  const onRemovePost = id => {
    dispatch(fetchDeletePost({sortProps, searchProps, id}))
  }
  return (
    <div className='posts'>
      {(!isLoaded ? [...Array(5)] : data).map((item, index)=> {
        return !isLoaded ? (
        <Skeleton key={index}/>
        ) : (
            <Post 
            key={item._id}
            onRemovePost={onRemovePost}
            {...item}
          />
        )
            })}
    </div>
  )
}
export default React.memo(Feed)