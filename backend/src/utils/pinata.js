import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();


export async function uploadToIPFS(filePath) {

    const formData = new FormData();

    formData.append(
        "file",
        fs.createReadStream(filePath)
    );


    const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
            headers: {
                ...formData.getHeaders(),
                Authorization: `Bearer ${process.env.PINATA_JWT}`
            }
        }
    );


    return response.data.IpfsHash;
}