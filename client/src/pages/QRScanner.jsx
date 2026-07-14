import { useEffect, useState } from "react";
import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";


function QRScanner() {

    const navigate = useNavigate();

    const [error,setError] = useState("");



    function handleResult(decodedText){


        console.log(
            "QR DATA:",
            decodedText
        );


        let certificateId;


        if(decodedText.includes("/verify/")){


            certificateId =
            decodedText.split("/verify/")[1];


        }
        else{


            certificateId =
            decodedText;


        }



        navigate(
            `/verify/${certificateId}`
        );


    }



    useEffect(()=>{


        const scanner =
        new Html5QrcodeScanner(

            "reader",

            {
                fps:10,
                qrbox:250
            },

            false

        );



        scanner.render(

            (decodedText)=>{


                handleResult(decodedText);


                scanner.clear();


            },

            ()=>{}

        );



        return ()=>{

            scanner.clear()
            .catch(()=>{});

        };


    },[]);




    async function scanFromFile(e){


        const file =
        e.target.files[0];


        if(!file)
            return;



        try{


            const html5QrCode =
            new Html5Qrcode(
                "reader-file"
            );


            const result =
            await html5QrCode.scanFile(
                file,
                true
            );


            handleResult(result);



            html5QrCode.clear();


        }
        catch(err){


            console.log(err);


            setError(
                "Invalid QR image"
            );

        }


    }





    return(

        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">


            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg">


                <h1 className="text-3xl font-bold text-center mb-6">

                    📷 Scan Certificate QR

                </h1>



                <h2 className="font-semibold mb-3">

                    Scan using Camera

                </h2>


                <div id="reader"></div>




                <hr className="my-8"/>




                <h2 className="font-semibold mb-3">

                    Upload QR Image

                </h2>



                <input

                    type="file"

                    accept="image/*"

                    onChange={scanFromFile}

                    className="border p-3 rounded w-full"

                />



                <div id="reader-file"></div>



                {
                    error &&

                    <p className="text-red-600 mt-4">

                        {error}

                    </p>

                }



            </div>


        </div>

    );

}


export default QRScanner;