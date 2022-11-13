import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeFilterProps } from '../../Redux/slices/postSlice'
const SortController = () => {
    const dispatch = useDispatch()
    const sortProps = useSelector(state=> state.post.filter.sortProps)
  return (
    <div className='navigation'>
          <button className={sortProps === "createdAt" && "active"} onClick={()=> dispatch(changeFilterProps({sortProps:"createdAt"}))}>Сначала новые</button>
          <button className={sortProps !== "createdAt" && "active"} onClick={()=> dispatch(changeFilterProps({sortProps:"viewsCount"}))}>Популярные</button>
    </div>
  )
}

export default SortController