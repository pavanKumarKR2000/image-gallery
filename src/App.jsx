
import './App.css'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import Gallery from './components/Gallery';
import Login from './components/Login';
import Header from './components/Header';
import { useState } from 'react';


function App() {

  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const [userData, setUserData] = useState();

  return (
    <div className='min-h-screen '>
      <Header user={user} supabaseClient={supabaseClient} />
      {
        user ? <Gallery user={user} supabaseClient={supabaseClient} /> : <Login supabaseClient={supabaseClient} setUserData={setUserData} />  
      }
    </div>
  )
}

export default App
