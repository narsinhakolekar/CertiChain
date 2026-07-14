import { expect } from "chai";
import { network } from "hardhat";

describe("Certificate Registry", function () {

    async function deployContracts() {

        const { ethers } = await network.connect();

        const [owner, university, employer] = await ethers.getSigners();


        const UniversityRegistry =
            await ethers.getContractFactory("UniversityRegistry");


        const universityRegistry =
            await UniversityRegistry.deploy(owner.address);

        await universityRegistry.waitForDeployment();


        await universityRegistry.registerUniversity(
            university.address,
            "IIIT Raichur",
            "admin@iiitr.ac.in",
            "https://iiitr.ac.in"
        );


        const CertificateRegistry =
            await ethers.getContractFactory("CertificateRegistry");


        const certificateRegistry =
            await CertificateRegistry.deploy(
                await universityRegistry.getAddress()
            );


        await certificateRegistry.waitForDeployment();


        return {
            owner,
            university,
            employer,
            universityRegistry,
            certificateRegistry,
            ethers
        };
    }



    it("Should issue certificate", async function () {

        const {
            certificateRegistry,
            university,
            ethers
        } = await deployContracts();


        const certificateHash =
            ethers.id("student_certificate_pdf");


        await certificateRegistry
            .connect(university)
            .issueCertificate(
                "IIITR-2026-CSE-000001",
                certificateHash,
                "QmExampleIPFSHash"
            );


        const certificate =
            await certificateRegistry.getCertificate(
                "IIITR-2026-CSE-000001"
            );


        expect(certificate.issuer)
            .to.equal(university.address);


        expect(certificate.ipfsCID)
            .to.equal("QmExampleIPFSHash");


        expect(certificate.revoked)
            .to.equal(false);

    });



    it("Should verify certificate", async function () {

        const {
            certificateRegistry,
            university,
            ethers
        } = await deployContracts();


        const hash =
            ethers.id("certificate");


        await certificateRegistry
            .connect(university)
            .issueCertificate(
                "CERT001",
                hash,
                "QmCID"
            );


        const result =
            await certificateRegistry.verifyCertificate(
                "CERT001",
                hash
            );


        expect(result)
            .to.equal(true);

    });



    it("Should revoke certificate", async function () {

        const {
            certificateRegistry,
            university,
            ethers
        } = await deployContracts();


        const hash =
            ethers.id("certificate");


        await certificateRegistry
            .connect(university)
            .issueCertificate(
                "CERT002",
                hash,
                "QmCID"
            );


        await certificateRegistry
            .connect(university)
            .revokeCertificate(
                "CERT002"
            );


        const result =
            await certificateRegistry.verifyCertificate(
                "CERT002",
                hash
            );


        expect(result)
            .to.equal(false);

    });

});