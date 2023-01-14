import { useState } from "react";


const Login = ({supabaseClient,setUserData}) => {

    const [userEmail, setUserEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [infoMessage, setInfoMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const login = async (e) => {
        
        e.preventDefault();
       
       
        if (userEmail) {
            setLoading(true);
        }

        const { data, error } = await supabaseClient.auth.signInWithOtp({
            email: userEmail,
            options: {
                emailRedirectTo: 'https://pavankumarkr2000.github.io/image-gallery/',
             }
        });

        if (error) {
            setErrorMessage("Please Enter valid email");
            setLoading(false);
        }
        else {
            setInfoMessage("Please check your email to get magic link");
            setUserData(data);
            setLoading(false);
            setIsDisabled(true)
        }
    }

  return (
      <div className="w-4/5 md:w-1/2 mx-auto bg-white border border-gray-300 h-max mt-32 py-8 px-4 md:px-12 rounded-md ">
          <form className="flex flex-col space-y-4 items-center" onSubmit={(e)=>{login(e)}}>
              <label htmlFor="userEmail" className="text-lg text-center">
                  Enter an Email to sign in with a magic link
              </label>
              <input
                  type="email"
                  className="w-full p-2 rounded-md border border-gray-300 outline-none flex-grow focus:border focus:border-blue-500"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="example@email.com"
                  id="userEmail"
                  required/>
              <button
                  type="submit"
                  disabled={isDisabled}
                  className="flex space-x-4 items-center cursor-pointer py-2 px-6 rounded-md bg-blue-500 hover:bg-blue-400 w-max text-white " >
                  <span>Get Magic Link</span>
                  {loading ? <img src="./loading.svg" alt="" className="h-6 w-6 bg-transparent" /> : <img src="./signin.svg" alt="signin" className="h-5 w-5"/>}
              </button>
               {
                  errorMessage ?
                      <p className="p-2 flex space-x-2 items-center bg-red-300 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="stroke-red-800 w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                        </svg>
                     <span>{errorMessage}</span></p> :null
              }
              {
                  infoMessage ?
                  <p className="p-2 flex space-x-2 items-center bg-green-300 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="stroke-green-800 w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                 <span>{infoMessage}</span></p>:null
              }
          </form>
      </div>
  )
}

export default Login;