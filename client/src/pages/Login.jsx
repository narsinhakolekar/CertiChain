import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LockKeyhole, Mail, GraduationCap } from "lucide-react";


function Login() {


  const navigate = useNavigate();


  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");



  async function handleSubmit(e){

    e.preventDefault();

    setError("");

    try{


      const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {

          method:"POST",

          headers:{
            "Content-Type":"application/json"
          },

          body:JSON.stringify({
            email,
            password
          })

        }
      );



      const data = await response.json();



      if(!response.ok){

        throw new Error(
          data.message
        );

      }



      localStorage.setItem(
        "token",
        data.token
      );


      localStorage.setItem(
        "university",
        JSON.stringify(
          data.university
        )
      );



      navigate("/dashboard");


    }
    catch(err){

      setError(
        err.message
      );

    }


  }





return (


<div className="
min-h-screen
bg-gradient-to-br
from-blue-900
via-indigo-800
to-purple-900
flex
items-center
justify-center
p-5
">


<div className="
bg-white/10
backdrop-blur-lg
shadow-2xl
rounded-3xl
p-10
w-full
max-w-md
text-white
">



<div className="
flex
justify-center
mb-5
">


<div className="
bg-white/20
p-5
rounded-full
">

<GraduationCap size={45}/>

</div>


</div>




<h1 className="
text-4xl
font-bold
text-center
mb-8
">

University Login

</h1>




<form
onSubmit={handleSubmit}
className="space-y-5"
>




<div className="relative">

<Mail
className="
absolute
left-3
top-3
text-gray-500
"
/>


<input

className="
w-full
p-3
pl-12
rounded-xl
text-black
outline-none
"

placeholder="University Email"

value={email}

onChange={
(e)=>setEmail(e.target.value)
}

/>


</div>





<div className="relative">


<LockKeyhole
className="
absolute
left-3
top-3
text-gray-500
"
/>


<input

type="password"

className="
w-full
p-3
pl-12
rounded-xl
text-black
outline-none
"

placeholder="Password"

value={password}

onChange={
(e)=>setPassword(e.target.value)
}

/>


</div>





<button

className="
w-full
bg-blue-500
hover:bg-blue-600
py-3
rounded-xl
font-semibold
text-lg
"

>

Login

</button>



</form>





{
error &&

<p className="
mt-5
text-red-300
text-center
">

{error}

</p>

}





<p className="
text-center
mt-6
">

Don't have an account?


<Link

to="/register"

className="
text-yellow-300
ml-2
font-semibold
"

>

Register

</Link>


</p>




</div>


</div>


);

}


export default Login;