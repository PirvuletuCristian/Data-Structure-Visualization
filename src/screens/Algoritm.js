import React from 'react'
import { Link } from 'react-router-dom'

export default function Algoritm() {
  return (
    <section>
    <div className='content-algoritm'>
    <ul>
      <li><Link to="/BST">Arbori binari de cautare</Link></li>
      <li><Link to="/BTree">Arbori B</Link></li>
    </ul>
    </div>
    </section>
  )
}
