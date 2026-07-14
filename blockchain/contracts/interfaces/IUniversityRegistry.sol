// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/// @title University Registry Interface
/// @notice Interface used by CertificateRegistry
interface IUniversityRegistry {

    /// @notice Returns true if the wallet belongs to an active university
    function isRegistered(
        address wallet
    ) external view returns (bool);

}