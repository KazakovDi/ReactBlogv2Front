import React from 'react'
import ReactMarkdown from "react-markdown"
import {Link} from "react-router-dom"
import { fetchSinglePost } from '../../Redux/slices/postSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../Redux/slices/authSlice'
import Comment from '../Comment/Comment'
import axios from '../../axios'
import styles from "./Post.module.scss"
 const Post = (props) => {
  const commentRef = React.useRef(null)
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const date = new Date(props.user?.createdAt)
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const addComment = async ()=> {
      await axios.post(`/createComment/${props._id}`, {text:commentRef.current.value})
      dispatch(fetchSinglePost(props._id))
    }
  return (
    <div className={!props.isFullPost ? `card ${styles.post}` : (`${styles.fullPost}`)}>
      {user ? (
        <>
          {user?._id === props.user?._id ? (
          <div className={styles.controls}>
            <Link to={`/createPost/${props._id}`}>Изменить</Link>
            <button className={styles.rmvBtn} onClick={()=> props.onRemovePost(props._id)}>Удалить</button>
        </div>
        ) : (<></>)}
        </>
      ) : (<></>)}
      {!props.imageUrl ? (<></>) : (
        <img className={styles.coverImg} src={`https://nervous-school-uniform-duck.cyclic.app${props.imageUrl}`} />
      )}
      <div className={styles.user}>
        <img className={styles.avatar} src={props.user?.avatarUrl}/>
        <div>
          <h4>{props.user?.fullName}</h4>
          <p>{date.toLocaleDateString('ru-RU', options)}</p>
        </div>
      </div>
      <div className={styles.postInfo}>
        <Link to={`/posts/${props._id}`}>
          {props.title}
        </Link>
        {props.isFullPost && (
          <ReactMarkdown children={props.text}/>
        )}
        <div className={styles.tags}>
          {props.tags?.map((tag, index) => {
            return (
              <p key={index}>#{tag.body}</p>
            )
          })}
        </div>
        <div className='stats'>
          <p>👁 {props.viewsCount}</p>
          <p>🗨 {props.comments?.length}</p>
        </div>
        {props.isFullPost && (
          <div className={styles.commentsSection}>
            <div className={styles.newComment}>
              <textarea rows={4} ref={commentRef} placeholder='Оставьте комментарий'/>
              <button onClick={addComment} type="button">Добавить комментарий</button>
            </div>
            <div className={styles.comments}>
              {props.comments?.map(com=> {
                return (
                  <Comment key={com.user} text={com.text} id={com.user} />
                )
              })}
            </div>
          </div>
        )}
        
      </div>
      
    </div>
  )
}
export default Post