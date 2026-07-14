import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ShieldCheck,
  FileText,
  ExternalLink,
  Building2,
  Wallet,
} from "lucide-react";

function VerifyCertificate() {
  const { id } = useParams();

  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function verify() {
      try {
        await fetch(
  `${import.meta.env.VITE_API_URL}/api/certificates/verify/${id}`,
        );

        const data = await response.json();

        if (!response.ok || !data.valid) {
          throw new Error("Invalid Certificate");
        }

        setCertificate(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    verify();
  }, [id]);

  if (loading) {
    return (
      <div
        className="
min-h-screen
flex
items-center
justify-center
bg-gray-100
"
      >
        <h2 className="text-xl font-semibold">
          🔍 Verifying Blockchain Record...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="
min-h-screen
flex
items-center
justify-center
bg-gray-100
"
      >
        <div
          className="
bg-white
p-10
rounded-3xl
shadow-xl
text-center
"
        >
          <h1
            className="
text-4xl
font-bold
text-red-600
"
          >
            ❌ Invalid Certificate
          </h1>

          <p className="mt-4">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
min-h-screen
bg-gradient-to-br
from-green-50
via-blue-50
to-indigo-100
p-10
"
    >
      <div
        className="
max-w-4xl
mx-auto
"
      >
        {/* Main Card */}

        <div
          className="
bg-white
rounded-3xl
shadow-2xl
p-10
"
        >
          <div
            className="
text-center
"
          >
            <div
              className="
flex
justify-center
"
            >
              <ShieldCheck
                size={70}
                className="
text-green-600
"
              />
            </div>

            <h1
              className="
text-5xl
font-bold
text-green-600
mt-4
"
            >
              Certificate Verified
            </h1>

            <p
              className="
text-gray-500
mt-2
"
            >
              Blockchain authenticity confirmed
            </p>
          </div>

          {/* Certificate ID */}

          <div
            className="
mt-10
bg-blue-50
rounded-2xl
p-6
"
          >
            <h3 className="font-bold">Certificate ID</h3>

            <p
              className="
mt-2
text-gray-700
break-all
"
            >
              {certificate.certificateId}
            </p>
          </div>

          {/* University */}

          <div
            className="
grid
md:grid-cols-2
gap-6
mt-6
"
          >
            <div
              className="
bg-gray-50
rounded-2xl
p-6
"
            >
              <Building2 className="text-blue-600" />

              <h3 className="font-bold mt-3">University</h3>

              <p>{certificate.issuer.name}</p>

              <p className="text-gray-600">{certificate.issuer.email}</p>

              <a
                href={certificate.issuer.website}
                target="_blank"
                className="
text-blue-600
"
              >
                {certificate.issuer.website}
              </a>
            </div>

            <div
              className="
bg-gray-50
rounded-2xl
p-6
"
            >
              <Wallet className="text-purple-600" />

              <h3 className="font-bold mt-3">Issuer Wallet</h3>

              <p
                className="
break-all
text-gray-600
"
              >
                {certificate.issuer.wallet}
              </p>
            </div>
          </div>

          {/* Blockchain Proof */}

          <div
            className="
mt-6
bg-gray-900
text-white
rounded-2xl
p-6
"
          >
            <h2
              className="
text-xl
font-bold
"
            >
              🔗 Blockchain Proof
            </h2>

            <p className="mt-4">
              <b>Document Hash</b>
            </p>

            <p
              className="
break-all
text-gray-300
"
            >
              {certificate.documentHash}
            </p>
          </div>

          <div
            className="
mt-6
text-center
"
          >
            <a
              href={`https://gateway.pinata.cloud/ipfs/${certificate.ipfsCID}`}
              target="_blank"
              className="
inline-flex
items-center
gap-2
bg-blue-600
text-white
px-8
py-4
rounded-xl
font-bold
hover:bg-blue-700
"
            >
              <FileText size={22} />
              View Original Certificate
              <ExternalLink size={18} />
            </a>
          </div>

          <p
            className="
text-center
mt-6
text-gray-500
"
          >
            Issued At:
            {new Date(certificate.issuedAt * 1000).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default VerifyCertificate;
