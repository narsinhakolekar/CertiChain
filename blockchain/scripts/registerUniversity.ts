import { network } from "hardhat";
import fs from "fs";

async function main() {
  const { ethers } = await network.connect();

  const [deployer] = await ethers.getSigners();

  console.log("Using wallet:", deployer.address);

  // Your deployed UniversityRegistry contract
  const contractAddress =
    "0xC6f86592eC712A138685D4Dd0700f5ef57a47a98";

  const abi = JSON.parse(
    fs.readFileSync(
      "./artifacts/contracts/UniversityRegistry.sol/UniversityRegistry.json",
      "utf8"
    )
  ).abi;

  const contract = new ethers.Contract(
    contractAddress,
    abi,
    deployer
  );

  const universityWallet =
    "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";

  console.log("Registering university...");

  const tx = await contract.registerUniversity(
    universityWallet,
    "IIIT Raichur",
    "admin@iiitraichur.ac.in",
    "https://iiitr.ac.in"
  );

  await tx.wait();

  console.log("University Registered ✅");
  console.log("Transaction:", tx.hash);
}

main().catch(console.error);