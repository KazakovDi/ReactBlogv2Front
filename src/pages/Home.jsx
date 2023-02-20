import React from 'react'


import Feed from '../components/Feed/Feed'
import Tags from '../components/Tags/Tags'
import SortController from '../components/SortController/SortController'
const Home = () => {
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