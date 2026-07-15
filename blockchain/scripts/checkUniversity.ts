import { network } from "hardhat";
import fs from "fs";

async function main() {
  const { ethers } = await network.connect();

  const contractAddress =
    "0xC6f86592eC712A138685D4Dd0700f5ef57a47a98";

  const abi = JSON.parse(
    fs.readFileSync(
      "./artifacts/contracts/UniversityRegistry.sol/UniversityRegistry.json",
      "utf8"
    )
  ).abi;

  const registry = new ethers.Contract(
    contractAddress,
    abi,
    (await ethers.getSigners())[0]
  );

  console.log("Owner:", await registry.owner());

  console.log(
    "0x8626 registered:",
    await registry.isRegistered(
      "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"
    )
  );

  console.log(
    "0x586e registered:",
    await registry.isRegistered(
      "0x586e7f865C779769b7cfEfF95b8cDF455004B095"
    )
  );
}

main().catch(console.error);