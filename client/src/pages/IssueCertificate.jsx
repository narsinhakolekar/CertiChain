import { useState } from "react";
import {
  UploadCloud,
  FileCheck,
  Loader2,
  Copy
} from "lucide-react";


function IssueCertificate() {


  const [file,setFile] = useState(null);
  const [loading,setLoading] = useState(false);
  const [result,setResult] = useState(null);
  const [error,setError] = useState("");



  function handleFile(e){

    setFile(
      e.target.files[0]
    );

  }




  async function handleSubmit(e){

    e.preventDefault();


    if(!file){

      setError(
        "Please upload certificate PDF"
      );

      return;

    }



    setLoading(true);
    setError("");



    try{


      const formData =
        new FormData();


      formData.append(
        "certificate",
        file
      );



      const token =
        localStorage.getItem(
          "token"
        );



      const response =
        await fetch(
  `${import.meta.env.VITE_API_URL}/api/certificates/issue`,
          {

            method:"POST",

            headers:{
              Authorization:
              `Bearer ${token}`
            },

            body:formData

          }
        );



      const data =
        await response.json();



      if(!response.ok){

        throw new Error(
          data.error
        );

      }



      setResult(data);



    }
    catch(err){

      setError(
        err.message
      );

    }
    finally{

      setLoading(false);

    }


  }





function downloadQR() {

  const link = document.createElement("a");

  link.href = result.qrCode;

  link.download = `${result.certificateId}-QR.png`;

  link.click();

}

function copyVerificationLink() {

  const url =
    `http://localhost:5173/verify/${result.certificateId}`;

  navigator.clipboard.writeText(url);

  alert("Verification link copied!");

}

return (


<div className="
min-h-screen
bg-gradient-to-br
from-slate-100
via-blue-50
to-indigo-100
p-10
">



<div className="
max-w-3xl
mx-auto
">





<div className="
bg-white
rounded-3xl
shadow-xl
p-10
">



<div className="
text-center
mb-8
">


<div className="
flex
justify-center
">

<UploadCloud
size={55}
className="
text-blue-600
"
/>

</div>



<h1 className="
text-4xl
font-bold
mt-4
text-gray-800
">

Issue Certificate

</h1>


<p className="
text-gray-500
mt-2
">

Upload PDF and store certificate securely on blockchain

</p>


</div>







<form
onSubmit={handleSubmit}
>



<label className="
border-2
border-dashed
border-blue-400
rounded-2xl
h-48
flex
flex-col
items-center
justify-center
cursor-pointer
hover:bg-blue-50
transition
">


<UploadCloud
size={40}
className="
text-blue-500
"
/>


<p className="
mt-3
text-gray-600
">

Click to upload PDF

</p>



<input

type="file"

accept="application/pdf"

className="hidden"

onChange={handleFile}

/>


</label>






{
file &&

<div className="
mt-5
bg-blue-50
rounded-xl
p-4
flex
items-center
gap-3
">


<FileCheck
className="text-green-600"
/>


<div>

<p className="font-semibold">

{file.name}

</p>


<p className="text-sm text-gray-500">

PDF Ready

</p>


</div>


</div>

}





<button

disabled={loading}

className="
mt-8
w-full
bg-blue-600
hover:bg-blue-700
text-white
py-4
rounded-xl
font-bold
text-lg
flex
justify-center
items-center
gap-2
"


>


{
loading ?

<>

<Loader2
className="animate-spin"
/>

Issuing on Blockchain...

</>


:

"🚀 Issue Certificate"


}



</button>




</form>





{
error &&

<p className="
text-red-600
mt-5
text-center
">

{error}

</p>

}




</div>








{
result &&

<div className="
mt-8
bg-white
rounded-3xl
shadow-xl
p-8
">


<h2 className="
text-3xl
font-bold
text-green-600
text-center
">

✅ Certificate Issued

</h2>




<div className="
mt-6
space-y-4
">


<p>

<b>Certificate ID</b>

<br/>

{result.certificateId}

</p>




<p>

<b>Document Hash</b>

<br/>

<span className="break-all">

{result.documentHash}

</span>

</p>





{
result.qrCode &&

<div className="text-center mt-6">

<img
  src={result.qrCode}
  alt="QR Code"
  className="
    mx-auto
    w-56
    border
    rounded-xl
    shadow-md
    p-2
    bg-white
  "
/>

<p className="mt-3 text-gray-600 font-medium">
  Scan this QR to verify the certificate
</p>

<div className="flex justify-center gap-4 mt-5">

<button
  onClick={downloadQR}
  className="
    bg-green-600
    hover:bg-green-700
    text-white
    px-5
    py-3
    rounded-xl
    font-semibold
  "
>
  ⬇ Download QR
</button>

<button
  onClick={copyVerificationLink}
  className="
    bg-indigo-600
    hover:bg-indigo-700
    text-white
    px-5
    py-3
    rounded-xl
    font-semibold
    flex
    items-center
    gap-2
  "
>
  <Copy size={18}/>
  Copy Link
</button>

</div>

<div className="mt-6">

<a
  href={`http://localhost:5173/verify/${result.certificateId}`}
  target="_blank"
  rel="noreferrer"
  className="
    text-blue-600
    hover:underline
    font-semibold
  "
>
  🔍 Verify Certificate Now
</a>

</div>

</div>

}



</div>



</div>

}




</div>


</div>


);


}


export default IssueCertificate;