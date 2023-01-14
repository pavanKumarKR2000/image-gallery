import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { createClient } from '@supabase/supabase-js'
import process from 'process';

const supabase = createClient(
  "https://agmiyqieenusefssdeck.supabase.co",
  import.meta.env.VITE_KEY
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
     </SessionContextProvider>      
  </React.StrictMode>,
)
