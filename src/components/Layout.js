import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
        <Container className='r_chandan'>
                <Header />
                    <main>
                        <Outlet></Outlet>
                    </main>
                <Footer />
        </Container>
    </>
  )
}
