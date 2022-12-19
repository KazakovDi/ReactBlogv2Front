import React from 'react'


import Feed from '../components/Feed/Feed'
import Tags from '../components/Tags/Tags'
import SortController from '../components/SortController/SortController'

const Home = () => {
  React.useEffect(()=> {
    alert("Этот пэт проект залит на бесплатный хостинг. Отсутсвующие фотографии в постах и долгая загрузка при первом рендере — особенности работы хостинга. На сайте реализованы функции регистрации и авторизации; добавления, удаления и изменения постов; удобная фильтрация постов по тегами и их сортировка")
  }, [])
  return (
    <div className='wrapper'>
        <div className='container'>
            <SortController />
            <div className='content'>
              <Feed />
              <div>
                <Tags />
              </div>
            </div>      
        </div>
    </div>
  )
}

export default Home