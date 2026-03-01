// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title ComplianceRegistry
 * @dev On-chain compliance and KYC/AML registry
 */
contract ComplianceRegistry is AccessControl {
    bytes32 public constant COMPLIANCE_ROLE = keccak256("COMPLIANCE_ROLE");

    struct ComplianceStatus {
        bool isApproved;
        uint256 approvedAt;
        string jurisdiction;
        uint256 expiry;
        bool whitelisted;
    }

    mapping(address => ComplianceStatus) public complianceStatus;
    mapping(address => string) public jurisdictions;

    event ComplianceUpdated(
        address indexed account,
        bool isApproved,
        string jurisdiction
    );
    event WhitelistUpdated(address indexed account, bool status);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(COMPLIANCE_ROLE, msg.sender);
    }

    function updateCompliance(
        address account,
        bool isApproved,
        string memory jurisdiction,
        uint256 expiry
    ) external onlyRole(COMPLIANCE_ROLE) {
        complianceStatus[account] = ComplianceStatus({
            isApproved: isApproved,
            approvedAt: block.timestamp,
            jurisdiction: jurisdiction,
            expiry: expiry,
            whitelisted: isApproved
        });

        jurisdictions[account] = jurisdiction;

        emit ComplianceUpdated(account, isApproved, jurisdiction);
    }

    function checkCompliance(address account) external view returns (bool) {
        ComplianceStatus memory status = complianceStatus[account];
        return status.isApproved && status.expiry > block.timestamp;
    }

    function isWhitelisted(address account) external view returns (bool) {
        return complianceStatus[account].whitelisted;
    }
}
