// import { certificateContract } from "../blockchain/certificate.js";


// export async function verifyCertificate(req, res) {

//     try {

//         const { id } = req.params;


//         const certificate =
//             await certificateContract.getCertificate(id);


//         res.json({

//             valid: !certificate.revoked,

//             certificateId: certificate.certificateId,

//             documentHash: certificate.documentHash,

//             ipfsCID: certificate.ipfsCID,

//             issuer: certificate.issuer,

//             issuedAt: Number(certificate.issuedAt),

//             revoked: certificate.revoked

//         });


//     } catch(error) {

//         console.error(error);


//         res.status(404).json({

//             valid:false,

//             error:"Certificate not found"

//         });

//     }
// }

import { certificateContract } from "../blockchain/certificate.js";
import { universityContract } from "../blockchain/university.js";


export async function verifyCertificate(req,res){

    try {

        const { id } = req.params;


        const certificate =
            await certificateContract.getCertificate(id);


        let universityData = null;


        try {

            const university =
                await universityContract.getUniversity(
                    certificate.issuer
                );


            universityData = {
                name: university.name,
                email: university.email,
                website: university.website
            };


        } catch(err){

            console.log(
                "University lookup failed:",
                err.message
            );

        }



        res.json({

            valid: !certificate.revoked,

            certificateId:
                certificate.certificateId,

            documentHash:
                certificate.documentHash,

            ipfsCID:
                certificate.ipfsCID,


            // issuer:{
            //     wallet:
            //         certificate.issuer,

            //     university:
            //         universityData
            // },
issuer: {
    wallet: certificate.issuer,
    name: universityData?.name || "",
    email: universityData?.email || "",
    website: universityData?.website || ""
},

            issuedAt:
                Number(certificate.issuedAt),


            revoked:
                certificate.revoked

        });


    } catch(error){

        console.error(error);


        res.status(404).json({

            valid:false,

            error:
            "Certificate not found"

        });

    }

}