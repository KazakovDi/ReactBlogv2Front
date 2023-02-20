import React from 'react'

import styles from "../Post/Post.module.scss"

import axios from '../../axios'
 const Comment = ({text, id}) => {
  const [user, setUser] = React.useState(null)
  React.useEffect(()=> { 
    async function fetch() {
      const {data} = await axios.get(`/auth/${id}`)
      setUser(data)
    }
    fetch()
  },[])
  return (
    <div className={styles.comment}>
      <div className={styles.user}>
        {user && 
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