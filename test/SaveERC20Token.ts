import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
  import { expect } from "chai";
  import { ethers } from "hardhat";
  
  describe("SaveERC20Token", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deploySaveERC20Token() {
      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await ethers.getSigners();
  
      const SogoToken = await ethers.getContractFactory("SogoToken");
      const sogoToken = await SogoToken.deploy(100);

      const SaveERC20Token = await ethers.getContractFactory("SaveERC20");
      const saveContract = await SaveERC20Token.deploy(sogoToken.target);

      return { owner, otherAccount, saveContract, sogoToken };
    }
  
    describe("Deposit", function () {
        it("Checking the deposit value", async function () {
            const { owner, saveContract, sogoToken } = await loadFixture(deploySaveERC20Token);
            const userBalanceBeforeDeposit = await saveContract.checkUserBalance(owner)
            await sogoToken.approve(saveContract.target, 10)
            await saveContract.connect(owner).deposit(10)
            const userBalanceAfterDeposit = await saveContract.checkUserBalance(owner)
            expect(userBalanceAfterDeposit).to.be.greaterThan(userBalanceBeforeDeposit)
            // expect(userBalanceAfterDeposit).to.be.equal(userBalanceBeforeDeposit + 10)
        })
    });

    describe("withdraw", function () {
        it("Checking the withdraw function", async function () {
            const { owner, saveContract, sogoToken } = await loadFixture(deploySaveERC20Token);
            await sogoToken.approve(saveContract.target, 10)
            await saveContract.connect(owner).deposit(10);
            const userBalanceBeforeWithdrawal = await saveContract.checkUserBalance(owner)
            await saveContract.connect(owner).withdraw(10)
            const userBalanceAfterWithdrawal = await saveContract.checkUserBalance(owner)
            expect(userBalanceAfterWithdrawal).to.be.lessThan(userBalanceBeforeWithdrawal)
            // expect(userBalanceAfterDeposit).to.be.equal(userBalanceBeforeDeposit + 10)
        })
    });
  });
  