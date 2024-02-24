import { ethers } from "hardhat";

async function main() {

    const [owner, otherAccount] = await ethers.getSigners();

    const sogoTokenAddress = "0xadB08Ac25cBF83d6493EF36f08baaFc7c7750863";
    const SaveERC20TokenAddress = "0x614B5154a1B2700c7F3eFBBfe77F387582be3A70";

    const tokenContract = await ethers.getContractAt("ISogoToken", sogoTokenAddress);

    const SaveERC20Contract = await ethers.getContractAt("ISaveERC20Token", SaveERC20TokenAddress);

    const amountToDeposit = ethers.parseUnits("1000", 18);

    console.log(await tokenContract.balanceOf("0xe902aC65D282829C7a0c42CAe165D3eE33482b9f"))
    
    const approveTx = await tokenContract.connect(owner).approve(SaveERC20TokenAddress, amountToDeposit)
     await approveTx.wait();

     console.log("----------approvalComplete----------")

    const depositTx = await SaveERC20Contract.deposit(amountToDeposit);
    await depositTx.wait();

    console.log("-----------depositComplete-----------")

    console.log(await SaveERC20Contract.checkContractBalance())


    const withdrawTx = await SaveERC20Contract.withdraw(amountToDeposit);
    await withdrawTx.wait()

    console.log("-----------withdrawComplete-----------")

    console.log(await SaveERC20Contract.checkContractBalance())



    // const SogoToken = await ethers.getContractFactory("SogoToken");
    // const sogoTokenContract =  SogoToken.attach(sogoTokenAddress);

    // const SaveERC20 = await ethers.getContractFactory("SaveERC20");
    // const SaveERC20Contract =  SaveERC20.attach(SaveERC20TokenAddress);


    // await sogoTokenContract.approve(SaveERC20, depositAmount).wait();

    // await SaveERC20Contract.deposit(depositAmount).wait();

    // console.log(await sogoTokenContract.balanceOf("0xe902aC65D282829C7a0c42CAe165D3eE33482b9f"))



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
