import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-dvh flex items-center justify-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <button className='px-4 py-3 border border-violet-800 rounded-md shadow-md bg-violet-600 text-white hover:opacity-80'
        onClick={() => navigate('/products')}>
          Home Test
      </button>
    </div>
  )
}

export default Home
