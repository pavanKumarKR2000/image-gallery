import { useState } from "react";

const Header = ({ user, supabaseClient }) => {
    
    const [isActive, setIsActive] = useState(false);

    const logout = async() => {
        const { error } = await supabaseClient.auth.signOut();
    }
 
  return (
      <header className={`px-2 py-4 flex ${user?'justify-between':'justify-center'} flex-wrap items-center bg-white border-b border-gray-300 sticky top-0 z-10 shadow-sm`}>
          <div className="flex space-x-2 items-center justify-center ">
              <h1 className="text-2xl md:text-3xl uppercase font-bold">image gallery</h1>
              <img src="./logo.svg" alt="logo" className="h-8 md:h-10" />
          </div>
          <div className="flex space-x-4 items-center justify-center ">
              {user ?
                  <p className="hidden md:flex space-x-2 items-center border border-gray-300 rounded-md px-4 py-2">
                       <img src="./user.svg" alt="user" className="h-6 w-6"/>
                       <span>{user.email}</span></p> : null}
              {user ? <button className="hidden md:flex space-x-2 items-center cursor-pointer py-2 px-6 rounded-md bg-blue-500 hover:bg-blue-400 w-max text-white border active:border-blue-600" onClick={logout}>
                           <span>Sign Out</span> 
                           <img src="./signout.svg" alt="signout" className="h-5 w-5"/>
                      </button> : null}
              {user ? <div className="md:hidden flex justify-center items-center">
                  <button onClick={()=>setIsActive(!isActive)}>
                      { isActive
                      ? <img src="./open.svg" alt="open" className="h-6 w-6"/>
                      :<img src="./close.svg" alt="close" className="h-6 w-6" />}
                  </button>
              </div>:''}
          </div>
          {isActive ? <div className="flex flex-col space-y-2 items-center justify-self-center flex-grow border border-gray-300 bg-white p-4 my-2 rounded-md">
                      <p className="flex space-x-2 items-center border border-gray-300 rounded-md px-4 py-2">
                          <img src="./user.svg" alt="user" className="h-6 w-6"/>
                          <span>{user.email}</span>
                      </p>
                        <button className="flex space-x-2 items-center cursor-pointer py-2 px-6 rounded-md bg-blue-500 hover:bg-blue-400 w-max text-white border active:border-blue-600" onClick={logout}>
                           <span>Sign Out</span> 
                           <img src="./signout.svg" alt="signout" className="h-5 w-5"/>
                        </button>
                  </div> : null}
      </header>
  )
}

export default Header;