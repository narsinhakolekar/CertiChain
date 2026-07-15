import { ethers } from "ethers";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const provider = new ethers.JsonRpcProvider(
    process.env.SEPOLIA_RPC_URL
);

const wallet = new ethers.Wallet(
    process.env.SEPOLIA_PRIVATE_KEY,
    provider
);

const artifact = JSON.parse(
    fs.readFileSync(
        "./src/blockchain/certificateAbi.json",
        "utf8"
    )
);

export const certificateContract =
    new ethers.Contract(
        process.env.CERTIFICATE_REGISTRY_ADDRESS,
        artifact.abi,
        wallet
    );