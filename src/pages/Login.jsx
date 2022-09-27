import React from 'react'
import {useForm} from "react-hook-form"
import {useDispatch, useSelector} from "react-redux"
import { Navigate } from "react-router-dom";
import { fetchLogin, selectAuth } from '../Redux/slices/authSlice'

import styles from "./Auth.module.scss"
 const Login = () => {
  const {register, formState: {errors, isValid}, handleSubmit} = useForm({
    defaultValues: {email:"Oleg@gmail.com", password:"reererbe"},
    mode: "onSubmit"
  })
  const dispatch = useDispatch()
  const isAuth = useSelector(selectAuth)
  const onSubmitHandler = async values => {
    try {
     const data = await dispatch(fetchLogin(values))
     if(data.payload)
        window.localStorage.setItem("token", data.payload.token)
      else if(data.error)
        return alert(data.error.message)
    } catch(err) {
      alert(err.response.data.message)
    }
 }
  if(isAuth)
    return <Navigate to="/"/>

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className={styles.formBlock}>
        <div>
          <p>Имя</p>
          <input {...register("email", {required: "Поле обязательно к заполнению"})} type="email"/>
        </div>
        <div>
          {errors?.email && <p>{errors?.email?.message || "Ошибка входа"}</p>}
        </div>
      </div>
      <div className={styles.formBlock}>
        <div>
          <p>Пароль</p>
          <input {...register("password", {required: "Поле обязательно к заполнению"})}/>
        </div>
        <div>
          {errors?.password && <p>{errors?.password?.message || "Ошибка входа"}</p>}
        </div>
      </div>

      <input type="submit" value="Авторизоваться" />
    </form>
  )
}
export default Login