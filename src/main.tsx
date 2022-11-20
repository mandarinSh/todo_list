import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './view/App'

import './view/styles/reset.scss';
import './view/styles/common.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
