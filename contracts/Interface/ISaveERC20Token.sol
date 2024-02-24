// SPDX-License-Identifier: SMIT
pragma solidity ^0.8.0;

interface ISaveERC20Token {
function deposit(uint256 _amount) external ;

function withdraw(uint256 _amount) external ;
function checkUserBalance(address _user) external view returns (uint256) ;
function checkContractBalance() external view returns(uint256);
function ownerWithdraw(uint256 _amount) external ;
}
