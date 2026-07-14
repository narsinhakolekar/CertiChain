// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./interfaces/IUniversityRegistry.sol";

contract CertificateRegistry {

    error UniversityNotRegistered();
    error CertificateAlreadyExists();
    error CertificateNotFound();
    error CertificateAlreadyRevoked();
    error UnauthorizedIssuer();

    struct Certificate {
        string certificateId;
        bytes32 documentHash;
        string ipfsCID;
        address issuer;
        uint64 issuedAt;
        bool revoked;
    }

    IUniversityRegistry public immutable universityRegistry;

    mapping(string => Certificate) private certificates;

    event CertificateIssued(
        string indexed certificateId,
        address indexed issuer
    );

    event CertificateRevoked(
        string indexed certificateId,
        address indexed issuer
    );

    modifier onlyUniversity() {
        if (!universityRegistry.isRegistered(msg.sender))
            revert UniversityNotRegistered();
        _;
    }

    constructor(address registryAddress) {
        universityRegistry = IUniversityRegistry(registryAddress);
    }

    function issueCertificate(
        string calldata certificateId,
        bytes32 documentHash,
        string calldata ipfsCID
    ) external onlyUniversity {

        if (certificates[certificateId].issuedAt != 0)
            revert CertificateAlreadyExists();

        certificates[certificateId] = Certificate({
            certificateId: certificateId,
            documentHash: documentHash,
            ipfsCID: ipfsCID,
            issuer: msg.sender,
            issuedAt: uint64(block.timestamp),
            revoked: false
        });

        emit CertificateIssued(certificateId, msg.sender);
    }

    function getCertificate(
        string calldata certificateId
    )
        external
        view
        returns (Certificate memory)
    {
        if (certificates[certificateId].issuedAt == 0)
            revert CertificateNotFound();

        return certificates[certificateId];
    }

    function verifyCertificate(
        string calldata certificateId,
        bytes32 documentHash
    )
        external
        view
        returns (bool)
    {
        Certificate memory cert = certificates[certificateId];

        if (cert.issuedAt == 0)
            return false;

        if (cert.revoked)
            return false;

        return cert.documentHash == documentHash;
    }

    function revokeCertificate(
        string calldata certificateId
    )
        external
    {
        Certificate storage cert = certificates[certificateId];

        if (cert.issuedAt == 0)
            revert CertificateNotFound();

        if (cert.revoked)
            revert CertificateAlreadyRevoked();

        if (cert.issuer != msg.sender)
            revert UnauthorizedIssuer();

        cert.revoked = true;

        emit CertificateRevoked(certificateId, msg.sender);
    }

    function certificateExists(
        string calldata certificateId
    )
        external
        view
        returns (bool)
    {
        return certificates[certificateId].issuedAt != 0;
    }
}