import React from 'react'
import Skeleton from "@mui/material/Skeleton";
import styles from "./Tags.module.scss"
import { useDispatch, useSelector } from 'react-redux';
import { changeFilterProps } from '../../Redux/slices/postSlice';
import { selectIsTagsLoaded,fetchTags, selectTags } from '../../Redux/slices/tagSlice';
 const Tags = ({}) => {
  const dispatch = useDispatch()
  const isLoaded = useSelector(selectIsTagsLoaded)

  const tags = useSelector(selectTags)
  const error = useSelector(state=> state.tag.error)
  React.useEffect(()=> {
    dispatch(fetchTags())
    .then(res=> console.log("res", res))
  }, [])
  if(error)
    return <div className='errorBlock'>{error}</div>
  return (
    <div className={`card ${styles.tagBlock}`}>
      <h3>ПОПУЛЯРНЫЕ ТЕГИ</h3>
      <ul className={styles.tags}>
        {isLoaded ? (
          tags.map(tag=> {
            return <li key={tag._id}><button onClick={()=> dispatch(changeFilterProps({searchProps:tag.body}))}>{tag.body}</button></li>
        })) : (
          [...Array(5)].map((_, index)=> {
            return  <Skeleton key={index} className={styles.Skeleton} height={50} width={250} />
          })
        )}
      </ul>
      <button onClick={()=> dispatch(changeFilterProps({searchProps:""}))} className={styles.all}>Все</button>
    </div>
  )
}
export default React.memo(Tags,
  (prevProps, nextProps)=> {
  if(nextProps.value === true) {
      return true
  } else {
      return false
  }
})