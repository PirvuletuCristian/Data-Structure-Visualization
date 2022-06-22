import React from 'react'
import '../App.css'
import {Link} from 'react-router-dom';

export default function Header() {
  return (
    <div>
    <header id='header'>
    <div className='logo'>Logo</div>
    <nav>
      <ul className='navbar'>
        <li><Link to="/">Acasă</Link></li>
        <li><Link to="/algoritm">Algoritm</Link></li>
        <li><Link to="/learn">Învățare</Link></li>
      </ul>
    </nav>
  </header>
  </div>
  )
}
