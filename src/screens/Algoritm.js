import React from 'react'
import { Link } from 'react-router-dom'

export default function Algoritm() {
  return (
    <section>
    <div className='content-algoritm'>
    <ul>
      <li><Link to="/BST">BST</Link></li>
      <li><Link to="/avl">AVL</Link></li>
    </ul>
    </div>
    </section>
  )
}
