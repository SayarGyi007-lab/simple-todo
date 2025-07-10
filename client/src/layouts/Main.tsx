
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

function Main() {
  return <section className='max-w-4xl mx-auto'>
    <Header/>
    <Outlet/>
  </section>
}

export default Main