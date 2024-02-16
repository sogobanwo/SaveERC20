import { ethers } from "hardhat";

async function main() {
  const lock = await ethers.deployContract("SaveERC20Token", [ethers.getSigner]);

  await lock.waitForDeployment();

  console.log(
    `SaveERC20Token is deployed to ${lock.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
