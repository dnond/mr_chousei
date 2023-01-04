import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App'
import { createUserRepository } from './user/core/repository'

const repository = createUserRepository()
repository.initUsers([
    'Alice',
    'Bob',
    'Chris'
  ])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App userRepository={repository}/>
  </React.StrictMode>,
)
