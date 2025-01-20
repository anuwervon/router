import React from 'react'
import Header from '../components/header'
import { Outlet } from 'react-router'
import Footer from '../components/footer'

const Layout = () => {
  return (
    <div>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout