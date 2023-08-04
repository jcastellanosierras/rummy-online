import React from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { Main } from '../components/Main'
import { Play } from '../components/Play'

export const Router = () => {
  return (
    <section>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/index' />} />
          <Route path='/index' element={<Main />} />
          <Route path='/play/:id'element={<Play />} />
        </Routes>
      </BrowserRouter>
    </section>
  )
}
