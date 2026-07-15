// import { ethers } from "ethers";
// import fs from "fs";
// import dotenv from "dotenv";

// dotenv.config();


// const provider =
//     new ethers.JsonRpcProvider(
//         "http://127.0.0.1:8545"
//     );


// const wallet =
//     new ethers.Wallet(
//         process.env.PRIVATE_KEY,
//         provider
//     );


// const artifact =
//     JSON.parse(
//         fs.readFileSync(
//             "./src/blockchain/universityAbi.json",
//             "utf8"
//         )
//     );


// const universityAddress =
//     "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";


// export const universityContract =
//     new ethers.Contract(
//         universityAddress,
//         artifact.abi,
//         wallet
//     );

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
        "./src/blockchain/universityAbi.json",
        "utf8"
    )
);

export const universityContract =
    new ethers.Contract(
        process.env.UNIVERSITY_REGISTRY_ADDRESS,
        artifact.abi,
        wallet
    );