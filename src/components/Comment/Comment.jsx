import React from 'react'
import axios from '../../axios'

import styles from "../Post/Post.module.scss"
 const Comment = ({text, id}) => {
  const [user, setUser] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(true)
  React.useEffect(()=> {
    const fetch = async ()=> {
      const {data} = await axios.get(`/auth/${id}`)
      setUser(data.userData)
      setIsLoading(false)
    }
    fetch()
  },[])
  return (
    <div className={styles.comment}>
      <div className={styles.user}>
        {!isLoading && 
          <>
            <img className={styles.avatar} src={user.avatarUrl}/>
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