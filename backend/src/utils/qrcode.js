// import QRCode from "qrcode";


// export async function generateQRCode(certificateId) {

//     const url =
//         `http://localhost:5173/verify/${certificateId}`;

//     const qr =
//         await QRCode.toDataURL(url);

//     return qr;
// }

import QRCode from "qrcode";

export async function generateQRCode(certificateId) {


    const baseURL =
        process.env.FRONTEND_URL ||
        "http://localhost:5173";


    const verifyURL =
        `${baseURL}/verify/${certificateId}`;


    return await QRCode.toDataURL(
        verifyURL
    );

}