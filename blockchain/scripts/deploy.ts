import { network } from "hardhat";

async function main() {

    const { ethers } = await network.connect();


    const [deployer] = await ethers.getSigners();

    console.log(
        "Deploying with:",
        deployer.address
    );


    const UniversityRegistry =
        await ethers.getContractFactory(
            "UniversityRegistry"
        );


    const universityRegistry =
        await UniversityRegistry.deploy(
            deployer.address
        );


    await universityRegistry.waitForDeployment();


    console.log(
        "UniversityRegistry:",
        await universityRegistry.getAddress()
    );



    const CertificateRegistry =
        await ethers.getContractFactory(
            "CertificateRegistry"
        );


    const certificateRegistry =
        await CertificateRegistry.deploy(
            await universityRegistry.getAddress()
        );


    await certificateRegistry.waitForDeployment();


    console.log(
        "CertificateRegistry:",
        await certificateRegistry.getAddress()
    );
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });