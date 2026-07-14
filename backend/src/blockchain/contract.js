import { ethers } from "ethers";
import abi from "./abi.json" with { type: "json" };
import dotenv from "dotenv";

dotenv.config();


const provider = new ethers.JsonRpcProvider(
    "http://127.0.0.1:8545"
);


// Hardhat first account private key
const wallet = new ethers.Wallet(
    process.env.PRIVATE_KEY,
    provider
);


const contractAddress =
    "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";


export const certificateContract =
    new ethers.Contract(
        contractAddress,
        abi,
        wallet
    );