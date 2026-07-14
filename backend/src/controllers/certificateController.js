import crypto from "crypto";
import fs from "fs";

import { uploadToIPFS } from "../utils/pinata.js";
import { certificateContract } from "../blockchain/certificate.js";
import { generateQRCode } from "../utils/qrcode.js";
import { universityContract } from "../blockchain/university.js";

import Certificate from "../models/Certificate.js";



export async function issueCertificate(req, res) {

    try {

        console.log("USER:", req.user);
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);


        if (!req.file) {

            return res.status(400).json({
                error:"Certificate PDF required"
            });

        }


        const filePath = req.file.path;


        // Generate certificate ID
        const certificateId =
            "CERT-IIITR-" + Date.now();



        // Generate SHA256 hash
        const fileBuffer =
            fs.readFileSync(filePath);


        const hash =
            crypto
            .createHash("sha256")
            .update(fileBuffer)
            .digest("hex");


        const documentHash =
            "0x" + hash;



        // Upload PDF to IPFS
        const cid =
            await uploadToIPFS(filePath);



        console.log("DEBUG DATA");
        console.log("certificateId =",certificateId);
        console.log("documentHash =",documentHash);
        console.log("ipfsCID =",cid);



        // Blockchain issue
        const tx =
            await certificateContract.issueCertificate(
                certificateId,
                documentHash,
                cid
            );


        await tx.wait();



        // Save certificate in MongoDB
       const savedCertificate =
await Certificate.create({

    certificateId,

    documentHash,

    ipfsCID: cid,

    issuerWallet: req.user.wallet,

    university: req.user.email,

    transactionHash: tx.hash,

    issuedAt: new Date(),

    status: "Active"

});


console.log(
    "MongoDB Saved ✅"
);

console.log(savedCertificate);
        console.log(
            "Certificate saved to MongoDB ✅"
        );



        const qrCode =
            await generateQRCode(
                certificateId
            );



        res.json({

            status:
                "Certificate Issued ✅",


            certificateId,


            documentHash,


            ipfsCID:
                cid,


            transactionHash:
                tx.hash,


            qrCode

        });



    }
    catch(error){


        console.error(error);


        res.status(500).json({

            status:
                "Failed ❌",

            error:
                error.message

        });

    }

}







export async function verifyCertificate(req,res){

    try {


        const { id } =
            req.params;



        const certificate =
            await certificateContract.getCertificate(id);



        let universityData = null;



        try {


            const university =
                await universityContract.getUniversity(
                    certificate.issuer
                );



            universityData = {

                name:
                    university.name,


                email:
                    university.email,


                website:
                    university.website

            };


        }
        catch(err){

            console.log(
                "University lookup failed:",
                err.message
            );

        }



        res.json({

            valid:
                !certificate.revoked,


            certificateId:
                certificate.certificateId,


            documentHash:
                certificate.documentHash,


            ipfsCID:
                certificate.ipfsCID,



            issuer:{

                wallet:
                    certificate.issuer,


                ...universityData

            },



            issuedAt:
                Number(certificate.issuedAt),


            revoked:
                certificate.revoked

        });



    }
    catch(error){


        console.error(error);


        res.status(404).json({

            valid:false,

            error:
            "Certificate not found"

        });


    }

}