import { network } from "hardhat";
import fs from "fs";

async function main() {

    const { ethers } = await import("ethers");


    const provider = new ethers.JsonRpcProvider(
        "http://127.0.0.1:8545"
    );


    const wallet = new ethers.Wallet(
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
    provider
);


    const contractAddress =
    "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

    const abi =
        JSON.parse(
            fs.readFileSync(
                "./artifacts/contracts/UniversityRegistry.sol/UniversityRegistry.json"
            )
        ).abi;


    const contract =
        new ethers.Contract(
            contractAddress,
            abi,
            wallet
        );


    const universityWallet =
        "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";


    const tx =
        await contract.registerUniversity(
            universityWallet,
            "IIIT Raichur",
            "admin@iiitraichur.ac.in",
            "https://iiitr.ac.in"
        );


    await tx.wait();


    console.log(
        "University Registered ✅"
    );

    console.log(
        "Transaction:",
        tx.hash
    );
}


main();