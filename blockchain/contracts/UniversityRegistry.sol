// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title University Registry
/// @author CertiChain
/// @notice Stores and manages approved universities
contract UniversityRegistry is Ownable {

    // =====================================================
    //                       ERRORS
    // =====================================================

    error InvalidAddress();
    error UniversityAlreadyRegistered();
    error UniversityNotRegistered();
    error EmptyField();

    // =====================================================
    //                       STRUCTS
    // =====================================================

    struct University {
        string name;
        string email;
        string website;
        bool isActive;
        uint64 registeredAt;
    }

    // =====================================================
    //                  STATE VARIABLES
    // =====================================================

    mapping(address => University) private universities;

    // =====================================================
    //                       EVENTS
    // =====================================================

    event UniversityRegistered(
        address indexed university,
        string name
    );

    event UniversityDeactivated(
        address indexed university
    );

    event UniversityUpdated(
        address indexed university
    );

    // =====================================================
    //                    CONSTRUCTOR
    // =====================================================

    constructor(address initialOwner)
        Ownable(initialOwner)
    {}

    // =====================================================
    //                  ADMIN FUNCTIONS
    // =====================================================

    /// @notice Register a new university
    function registerUniversity(
        address wallet,
        string calldata name,
        string calldata email,
        string calldata website
    )
        external
        onlyOwner
    {
        if (wallet == address(0))
            revert InvalidAddress();

        if (bytes(name).length == 0)
            revert EmptyField();

        if (universities[wallet].isActive)
            revert UniversityAlreadyRegistered();

        universities[wallet] = University({
            name: name,
            email: email,
            website: website,
            isActive: true,
            registeredAt: uint64(block.timestamp)
        });

        emit UniversityRegistered(wallet, name);
    }

    /// @notice Deactivate a university
    function deactivateUniversity(
        address wallet
    )
        external
        onlyOwner
    {
        if (!universities[wallet].isActive)
            revert UniversityNotRegistered();

        universities[wallet].isActive = false;

        emit UniversityDeactivated(wallet);
    }

    /// @notice Update university details
    function updateUniversity(
        address wallet,
        string calldata email,
        string calldata website
    )
        external
        onlyOwner
    {
        if (!universities[wallet].isActive)
            revert UniversityNotRegistered();

        universities[wallet].email = email;
        universities[wallet].website = website;

        emit UniversityUpdated(wallet);
    }

    // =====================================================
    //                    VIEW FUNCTIONS
    // =====================================================

    function isRegistered(
        address wallet
    )
        external
        view
        returns(bool)
    {
        return universities[wallet].isActive;
    }

    function getUniversity(
        address wallet
    )
        external
        view
        returns (University memory)
    {
        if (!universities[wallet].isActive)
            revert UniversityNotRegistered();

        return universities[wallet];
    }
}