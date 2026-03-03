// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ITokenizedStock
 * @dev Interface for TokenizedStock contract
 */
interface ITokenizedStock {
    function mint(address to, uint256 amount) external;
    function updateWhitelist(address account, bool status) external;
    function whitelist(address account) external view returns (bool);
    function stockSymbol() external view returns (string memory);
    function totalAuthorizedSupply() external view returns (uint256);
}
