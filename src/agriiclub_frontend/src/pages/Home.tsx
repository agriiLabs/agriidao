import React from 'react'
import { useAuth } from '../hooks/Context'

const Home = () => {
  const {logout} = useAuth()

  return (
    <div>Testing

  <button onClick={logout}>Logout</button>
    </div>

  )
}

export default Home