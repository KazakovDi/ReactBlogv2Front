import React from 'react'
import {useForm} from "react-hook-form"
import {useDispatch, useSelector} from "react-redux"
import { fetchAuthMe } from '../Redux/slices/authSlice'
import { Navigate, useNavigate } from "react-router-dom";
import { selectAuth } from '../Redux/slices/authSlice'
import styles from "./Auth.module.scss"

import axios from '../axios';
 const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {register, formState: {errors, isValid}, handleSubmit} = useForm({
    defaultValues: {email:"Oleg@gmail.com", password:"reererbe"},
    mode: "onSubmit"
  })
  const isAuth = useSelector(selectAuth)
  const onSubmitHandler = async values => {
    try {
     const {data} = await axios.post("/auth/register", values)
     if(data.token)
        window.localStorage.setItem("token", data.token)
      await dispatch(fetchAuthMe())
      navigate("/")
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
          <input {...register("fullName", {required: "Поле обязательно к заполнению"})} type="text"/>
        </div>
        <div>
          {errors?.fullName && <p>{errors?.fullName?.message || "Ошибка входа"}</p>}
        </div>
      </div>
      <div className={styles.formBlock}>
        <div>
          <p>E-mail</p>
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
      <input type="submit" value="Зарегистрироваться" />
    </form>
  )
}
export default Register