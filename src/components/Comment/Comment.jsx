import React from 'react'

import styles from "../Post/Post.module.scss"
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../../Redux/slices/authSlice'
 const Comment = ({text, id}) => {
  
  const dispatch = useDispatch()
  const user = useSelector(state=> state.auth.data)
  const isLoaded = useSelector(state=> !!state.auth.data)
  React.useEffect(()=> { dispatch(fetchUser({id})) },[])
  return (
    <div className={styles.comment}>
      <div className={styles.user}>
        {isLoaded && 
          <>
            <img className={styles.avatar} alt={"Avatar"} src={user.avatarUrl}/>
            <div>
              <h4>{user.fullName}</h4>
            </div>
          </>
        }
        </div>
        <p>{text}</p>
    </div>
  )
}
export default Comment