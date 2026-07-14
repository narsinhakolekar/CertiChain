import { Link } from "react-router-dom";

function Navbar() {

  return (

    <nav className="
      bg-gradient-to-r
      from-blue-700
      via-indigo-700
      to-purple-700
      text-white
      shadow-lg
    ">

      <div className="
        max-w-7xl
        mx-auto
        px-8
        py-4
        flex
        justify-between
        items-center
      ">


        {/* Logo */}

        <Link
          to="/"
          className="
            text-3xl
            font-bold
            tracking-wide
            hover:scale-105
            transition
          "
        >

          🎓 CertiChain

        </Link>



        {/* Menu */}

        <div className="
          flex
          items-center
          gap-6
          font-semibold
        ">


          <Link
            to="/"
            className="
              hover:text-blue-200
              transition
            "
          >
            Home
          </Link>



          <Link
            to="/scan"
            className="
              hover:text-blue-200
              transition
            "
          >
            📷 Scan
          </Link>



          <Link
            to="/login"
            className="
              bg-white
              text-blue-700
              px-5
              py-2
              rounded-xl
              hover:bg-blue-50
              transition
              shadow-md
            "
          >

            University Portal

          </Link>


        </div>


      </div>

    </nav>

  );

}


export default Navbar;