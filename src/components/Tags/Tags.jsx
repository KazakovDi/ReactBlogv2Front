import React from 'react'
import Skeleton from "@mui/material/Skeleton";
import styles from "./Tags.module.scss"
 const Tags = ({tags, isLoaded, onChangeTag, tagError}) => {
  return (
    <div className={`card ${styles.tagBlock}`}>
      <h3>ПОПУЛЯРНЫЕ ТЕГИ</h3>
      <ul className={styles.tags}>
        {isLoaded ? (
          tags.map(tag=> {
            return <li><button key={tag._id} onClick={()=> onChangeTag(tag.body)}>{tag.body}</button></li>
        })) : (
          [...Array(5)].map(()=> {
            return  <Skeleton className={styles.Skeleton} height={50} width={250} />
          })
        )}
      </ul>
      <button onClick={()=> onChangeTag(undefined)} className={styles.all}>Все</button>
    </div>
  )
}
export default Tags