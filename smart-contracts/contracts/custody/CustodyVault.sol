// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title CustodyVault
 * @dev Smart contract-controlled custody vault for tokenized stocks
 */
contract CustodyVault is AccessControl {
    bytes32 public constant CUSTODIAN_ROLE = keccak256("CUSTODIAN_ROLE");
    bytes32 public constant GUARDIAN_ROLE = keccak256("GUARDIAN_ROLE");

    bool public paused;
    mapping(address => uint256) public balances;

    event Deposit(address indexed token, address indexed user, uint256 amount);
    event Withdrawal(address indexed token, address indexed user, uint256 amount);
    event Paused(address account);
    event Unpaused(address account);

    modifier whenNotPaused() {
        require(!paused, "CustodyVault: Paused");
        _;
    }

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(CUSTODIAN_ROLE, msg.sender);
        _grantRole(GUARDIAN_ROLE, msg.sender);
    }

    function deposit(address token, uint256 amount) external whenNotPaused {
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        balances[token] += amount;

        emit Deposit(token, msg.sender, amount);
    }

    function withdraw(
        address token,
        address to,
        uint256 amount
    ) external onlyRole(CUSTODIAN_ROLE) whenNotPaused {
        require(balances[token] >= amount, "CustodyVault: Insufficient balance");

        balances[token] -= amount;
        IERC20(token).transfer(to, amount);

        emit Withdrawal(token, to, amount);
    }

    function pause() external onlyRole(GUARDIAN_ROLE) {
        paused = true;
        emit Paused(msg.sender);
    }

    function unpause() external onlyRole(GUARDIAN_ROLE) {
        paused = false;
        emit Unpaused(msg.sender);
    }
}
