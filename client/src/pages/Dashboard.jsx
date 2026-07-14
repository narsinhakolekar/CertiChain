import { Link, useNavigate } from "react-router-dom";
import {
  FilePlus,
  FileText,
  LogOut,
  Wallet,
  Mail,
  Building2
} from "lucide-react";


function Dashboard() {


  const navigate = useNavigate();


  const university =
    JSON.parse(
      localStorage.getItem("university")
    );



  function logout(){

    localStorage.removeItem("token");
    localStorage.removeItem("university");

    navigate("/login");

  }




return (


<div className="
min-h-screen
bg-gradient-to-br
from-slate-100
via-blue-50
to-indigo-100
p-8
">



<div className="
max-w-7xl
mx-auto
">



{/* Welcome Card */}

<div className="
bg-gradient-to-r
from-blue-700
to-indigo-800
rounded-3xl
shadow-xl
p-10
text-white
">


<div className="
flex
items-center
gap-5
">


<div className="
bg-white/20
p-5
rounded-full
">

<Building2 size={45}/>

</div>



<div>

<h1 className="
text-4xl
font-bold
">

University Dashboard

</h1>


<p className="
text-blue-100
mt-2
text-lg
">

Welcome, {university?.name}

</p>


</div>


</div>


</div>






{/* University Details */}


<div className="
grid
md:grid-cols-3
gap-6
mt-8
">



<div className="
bg-white
rounded-2xl
shadow-lg
p-6
">

<Mail
className="text-blue-600"
/>


<h3 className="
font-semibold
mt-3
">

Email

</h3>


<p className="text-gray-600 break-all">

{university?.email}

</p>


</div>





<div className="
bg-white
rounded-2xl
shadow-lg
p-6
">


<Wallet
className="text-purple-600"
/>


<h3 className="
font-semibold
mt-3
">

Wallet Address

</h3>


<p className="
text-gray-600
break-all
">

{university?.wallet}

</p>


</div>






<div className="
bg-white
rounded-2xl
shadow-lg
p-6
">


<FileText
className="text-green-600"
/>


<h3 className="
font-semibold
mt-3
">

Certificates Issued

</h3>


<p className="
text-5xl
font-bold
text-green-600
mt-3
">

{/* Later connect API count */}

0

</p>


</div>



</div>








{/* Actions */}


<div className="
grid
md:grid-cols-3
gap-6
mt-10
">



<Link

to="/issue"

className="
bg-blue-600
hover:bg-blue-700
text-white
rounded-2xl
shadow-xl
p-8
flex
flex-col
items-center
gap-4
transition
hover:scale-105
"

>


<FilePlus size={45}/>

<span className="
text-xl
font-bold
">

Issue Certificate

</span>


</Link>





<Link

to="/certificates"

className="
bg-green-600
hover:bg-green-700
text-white
rounded-2xl
shadow-xl
p-8
flex
flex-col
items-center
gap-4
transition
hover:scale-105
"

>


<FileText size={45}/>

<span className="
text-xl
font-bold
">

My Certificates

</span>


</Link>





<button

onClick={logout}

className="
bg-red-600
hover:bg-red-700
text-white
rounded-2xl
shadow-xl
p-8
flex
flex-col
items-center
gap-4
transition
hover:scale-105
"

>


<LogOut size={45}/>


<span className="
text-xl
font-bold
">

Logout

</span>


</button>




</div>



</div>



</div>


);


}


export default Dashboard;