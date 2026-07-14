import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function MyCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCertificates() {
      try {
        const token = localStorage.getItem("token");

        console.log("TOKEN:", token);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/certificates`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        console.log("Response Status:", response.status);
        console.log("MY CERTIFICATES:", data);

        if (response.ok) {
          setCertificates(data);
        } else {
          console.error(data);
          alert(data.message || "Failed to load certificates.");
        }
      } catch (err) {
        console.error("Error loading certificates:", err);
      } finally {
        setLoading(false);
      }
    }

    loadCertificates();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            📄 My Certificates
          </h1>

          <Link
            to="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            ← Dashboard
          </Link>
        </div>

        {loading ? (
          <p className="text-xl">Loading certificates...</p>
        ) : certificates.length === 0 ? (
          <p className="text-center p-8 text-gray-600">
            No certificates issued yet.
          </p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-4 text-left">
                  Certificate ID
                </th>

                <th className="p-4 text-left">
                  Issued Date
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {certificates.map((certificate) => (
                <tr
                  key={certificate.certificateId}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4 font-medium">
                    {certificate.certificateId}
                  </td>

                  <td className="p-4">
                    {new Date(
                      certificate.issuedAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    <span className="text-green-600 font-semibold">
                      {certificate.status}
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    <Link
                      to={`/verify/${certificate.certificateId}`}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                    >
                      Verify
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );




  return (

    <div className="min-h-screen bg-gray-100 p-10">


      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-8">



        <div className="flex justify-between items-center mb-8">


          <h1 className="text-4xl font-bold">

            📄 My Certificates

          </h1>



          <Link

            to="/dashboard"

            className="bg-blue-600 text-white px-5 py-2 rounded-lg"

          >

            ← Dashboard

          </Link>


        </div>





        {
          loading ?


          (

            <p className="text-xl">

              Loading certificates...

            </p>

          )


          :


          (

          certificates.length === 0 ?


          (

            <p className="text-center p-8 text-gray-600">

              No certificates issued yet.

            </p>

          )


          :


          (

          <table className="w-full border-collapse">


            <thead>


              <tr className="bg-blue-600 text-white">


                <th className="p-4 text-left">

                  Certificate ID

                </th>


                <th className="p-4 text-left">

                  Issued Date

                </th>


                <th className="p-4 text-left">

                  Status

                </th>


                <th className="p-4 text-center">

                  Action

                </th>


              </tr>


            </thead>



            <tbody>



            {

              certificates.map(
                (certificate)=>(


                <tr

                  key={
                    certificate.certificateId
                  }

                  className="border-b"

                >



                  <td className="p-4">

                    {
                      certificate.certificateId
                    }

                  </td>



                  <td className="p-4">


                    {
                      new Date(
                        certificate.issuedAt
                      )
                      .toLocaleDateString()
                    }


                  </td>



                  <td className="p-4">


                    <span className="text-green-600 font-semibold">

                      {
                        certificate.status
                      }

                    </span>


                  </td>



                  <td className="p-4 text-center">


                    <Link

                      to={
                        `/verify/${certificate.certificateId}`
                      }

                      className="bg-green-600 text-white px-4 py-2 rounded-lg"

                    >

                      Verify

                    </Link>


                  </td>



                </tr>


              ))

            }



            </tbody>


          </table>


          )

          )

        }



      </div>


    </div>

  );

}


export default MyCertificates;