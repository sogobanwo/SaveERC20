import { ethers } from "hardhat";

async function main() {
  const SogoToken = await ethers.deployContract("SogoToken", [100000])
  SogoToken.waitForDeployment();

  const SaveERC20Token = await ethers.deployContract("SaveERC20", [SogoToken.target]);
  await SaveERC20Token.waitForDeployment();

  console.log(
    `SogoToken is deployed to ${SogoToken.target}`
  );

  console.log(
    `SaveERC20Token is deployed to ${SaveERC20Token.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
