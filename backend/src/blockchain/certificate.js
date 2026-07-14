import { ethers } from "ethers";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();


const provider =
    new ethers.JsonRpcProvider(
        "http://127.0.0.1:8545"
    );


const wallet =
    new ethers.Wallet(
        process.env.PRIVATE_KEY,
        provider
    );


const artifact =
    JSON.parse(
        fs.readFileSync(
            "./src/blockchain/certificateAbi.json",
            "utf8"
        )
    );


const certificateAddress =
    "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";


export const certificateContract =
    new ethers.Contract(
        certificateAddress,
        artifact.abi,
        wallet
    );