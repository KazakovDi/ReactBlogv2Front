import React from 'react'


import Feed from '../components/Feed/Feed'
import Tags from '../components/Tags/Tags'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, setPostError, fetchDeletePost, clearErrors} from '../Redux/slices/postSlice'
import { fetchTags, selectTags, selectIsTagsLoaded } from '../Redux/slices/tagSlice'
const Home = () => {
  const [sortProps, setSortProps] = React.useState("createdAt")
  const data = useSelector(state=> state.post.data)
  const isLoaded = useSelector(state=> Boolean(state.post.data))
  const tags = useSelector(selectTags)
  const isTagsLoaded = useSelector(selectIsTagsLoaded)
  const error = useSelector(state=> state.post.error)
  const tagError = useSelector(state=> state.tag.error)
  React.useEffect(()=> {
      dispatch(clearErrors())
      dispatch(fetchPosts({sortProps}))
      .then(res=> {
        if(res.error) {
          dispatch(setPostError(res.error.message))
        }
      })
      dispatch(fetchTags())
  }, [sortProps])
  const dispatch = useDispatch()
  const onChangeTag = (searchProps)=> {
    dispatch(fetchPosts({sortProps, searchProps}))
  }
  const onRemovePost = id => {
    dispatch(fetchDeletePost({sortProps, id}))
  }
  if(error) {
    return <div className='errorBlock'>{error}</div>
  }
  return (
    <div className='wrapper'>
        <div className='container'>
            <div className='navigation'>
                <button className={sortProps === "createdAt" && "active"} onClick={()=> setSortProps("createdAt")}>Сначала новые</button>
                <button className={sortProps !== "createdAt" && "active"} onClick={()=> setSortProps("viewsCount")}>Популярные</button>
            </div>
            <div className='content'>
              <Feed onRemovePost={onRemovePost} data={data} isLoaded={isLoaded}/>
              <div>
                <Tags tagError={tagError} tags={tags} onChangeTag={onChangeTag} isLoaded={isTagsLoaded}/>
              </div>
            </div>      
        </div>
    </div>
  )
}

export default Home