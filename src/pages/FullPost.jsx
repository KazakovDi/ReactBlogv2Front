import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import { fetchSinglePost, fetchDeletePost } from '../Redux/slices/postSlice';
import Post from "../components/Post/Post"
const FullPost = () => {
    const error = useSelector(state=> state.post.error)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const data = useSelector(state => {
      if(state.post.data) return state.post.data[0]
      return null
    })
    const isLoaded = useSelector(state => !!state.post.data)
    const {id} = useParams()
    React.useEffect(()=> {
            dispatch(fetchSinglePost(id))
    }, [])
    const onRemovePost = id => {
        dispatch(fetchDeletePost({sortProps: "createdAt", id}))
        navigate('/')
      }
    if(error)
        return <div className='errorBlock'>{error}</div>
  return (
    <div className="container">
      {isLoaded ? (
        <Post 
          title={data.title}
          imageUrl={data.imageUrl}
          tags={data.tags}
          text={data.text}
          user={data.user}
          comments={data.comments}
          viewsCount={data.viewsCount}
          _id={data._id}
          isFullPost={true}
          onRemovePost={onRemovePost}
        />
      ) : (
        <div>
          Loading
        </div>
      )}
            
        
    </div>
  )
}

export default FullPost