import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Building2,
  Search,
  ScanLine
} from "lucide-react";


function Home() {

  return (

    <div className="
      min-h-screen
      bg-gradient-to-br
      from-blue-700
      via-indigo-800
      to-purple-900
      flex
      items-center
      justify-center
      p-8
    ">


      <div className="
        max-w-5xl
        w-full
        text-center
        text-white
      ">


        {/* Hero Section */}

        <div className="
          bg-white/10
          backdrop-blur-lg
          border
          border-white/20
          rounded-3xl
          shadow-2xl
          p-12
        ">


          <div className="
            flex
            justify-center
            mb-6
          ">

            <div className="
              bg-white/20
              p-5
              rounded-full
            ">

              <ShieldCheck
                size={60}
              />

            </div>

          </div>




          <h1 className="
            text-6xl
            font-bold
            mb-5
          ">

            🎓 CertiChain

          </h1>



          <p className="
            text-xl
            text-blue-100
            mb-10
          ">

            Secure Blockchain Certificate Verification System

          </p>





          {/* Buttons */}


          <div className="
            grid
            md:grid-cols-3
            gap-6
          ">



            <Link

              to="/login"

              className="
                bg-white
                text-blue-700
                rounded-2xl
                p-6
                font-bold
                shadow-lg
                hover:scale-105
                transition
              "

            >

              <Building2
                className="
                  mx-auto
                  mb-3
                "
                size={35}
              />

              University Login


            </Link>






            <Link

              to="/register"

              className="
                bg-green-500
                rounded-2xl
                p-6
                font-bold
                shadow-lg
                hover:scale-105
                transition
              "

            >

              🏫

              <br/>

              Register University


            </Link>







            <Link

              to="/scan"

              className="
                bg-purple-500
                rounded-2xl
                p-6
                font-bold
                shadow-lg
                hover:scale-105
                transition
              "

            >

              <ScanLine
                className="
                  mx-auto
                  mb-3
                "
                size={35}
              />


              Scan QR Certificate


            </Link>



          </div>



        </div>





        {/* Features */}


        <div className="
          grid
          md:grid-cols-3
          gap-5
          mt-8
        ">



          <div className="
            bg-white/10
            backdrop-blur
            rounded-xl
            p-5
          ">

            🔗

            <h3 className="font-bold mt-2">

              Blockchain Secured

            </h3>

          </div>





          <div className="
            bg-white/10
            backdrop-blur
            rounded-xl
            p-5
          ">

            📄

            <h3 className="font-bold mt-2">

              IPFS Document Storage

            </h3>

          </div>





          <div className="
            bg-white/10
            backdrop-blur
            rounded-xl
            p-5
          ">

            <Search
              className="mx-auto"
            />

            <h3 className="font-bold mt-2">

              Instant Verification

            </h3>

          </div>




        </div>



      </div>


    </div>

  );

}


export default Home;