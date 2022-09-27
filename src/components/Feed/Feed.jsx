import React from 'react'
import Post from '../Post/Post'
import Skeleton from '../Post/Skeleton'
 const Feed = ({isLoaded, data, onRemovePost}) => {
  return (
    <div className='posts'>
      {(!isLoaded ? [...Array(5)] : data).map((item, index)=> {
        return !isLoaded ? (
        <Skeleton />
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
export default Feed