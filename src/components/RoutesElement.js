import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from '../screens/Home';
import Algoritm from '../screens/Algoritm';
import Learn from '../screens/Learn'; 
import BST from '../algoritmi/BST';
import BTree from '../algoritmi/BTree';

export default function RoutesElement() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="algoritm" element={<Algoritm />} />
        <Route path="learn" element={<Learn />} />
        <Route path="BST" element={<BST />} />
        <Route path="BTree" element={<BTree />} />
      </Routes>
  )
}
