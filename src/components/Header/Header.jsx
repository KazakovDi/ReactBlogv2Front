import React from 'react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAuthMe } from '../../Redux/slices/authSlice'
import { fetchPosts } from '../../Redux/slices/postSlice'
import axios from "../../axios"
import { logout } from '../../Redux/slices/authSlice'
import styles from "./Header.module.scss"

 const Header = () => {
    const dispatch = useDispatch()
    const inputRef = useRef()
    const user = useSelector(state=> state.auth)
    const isAuth = Boolean(user.data)
    const [avatar, setAvatar] = React.useState()
    React.useEffect(()=> {
          dispatch(fetchAuthMe())
    },[avatar])
    const onClickLogout = () => {
        if(window.confirm("Выйти из аккаунта ?"))
          dispatch(logout())
        window.localStorage.removeItem("token")
    }
    const changeAvatar = async event=> {
        try {
            const formData = new FormData()
            const file = event.target.files[0]
            formData.append("image", file)
            const {data} = await axios.post("/uploadImage", formData)
            await axios.post("/auth/changeAvatar", {avatarUrl: data.url})
            setAvatar(data.url)
            dispatch(fetchPosts({sortProps: "createdAt"}))
          } catch(err) {
            alert("Не удалось загрузить файл")
          }
      }
  return (
        <div className='container'>
            <div className={styles.navbar}>
                <Link className={styles.logo}to="/" >Blogged</Link>
                {!isAuth ? (
                <div className={styles.controls}>
                    <Link to="/auth/login" className={styles.hollow}>Войти</Link>
                    <Link to="/auth/register" className={styles.calm}>Зарегистрироваться</Link>
                </div>
                ) : (
                <div className={styles.controls}>
                        <>
                        {isAuth && (
                            <>
                                <h2>{user.data.fullName}</h2>
                                <img onClick={()=> inputRef.current.click()} src={user.data.avatarUrl} />
                                <input ref={inputRef} onChange={event=> changeAvatar(event)} type="file" hidden />
                            </>

                        )}
                        </>
                    <Link to="/createPost" className={styles.calm}>Новая статья</Link>
                    <button onClick={onClickLogout} className={styles.agressive}>Выйти</button>
                </div>
                )}
            </div>
        </div>
  )
}
export default Header