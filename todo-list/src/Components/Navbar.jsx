import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-blue-950 text-white py-2'>
        <div className='logo'>
            <span className='mx-5 font-bold'>Task Planner</span>
        </div>
    <ul className='flex gap-10 mx-10'>
        <li className='hover:font-bold cursor-pointer transition-all duration-100'>Home</li>
        <li className='hover:font-bold cursor-pointer transition-all duration-100'>About</li>
    </ul>
    </nav>
  )
}

export default Navbar