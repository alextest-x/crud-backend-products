import React from 'react'
import ReactDOM from 'react-dom/client'
//import { App } from './App.jsx'
import { ProductApp } from './components/ProductApp.jsx'
//import './index.css'

//ponemos un objeto title= { { title: 'Lista de Productos '} }

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProductApp title= { 'Lista de Productos '}/>
  </React.StrictMode>,
)
