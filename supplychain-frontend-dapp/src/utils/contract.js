import { ethers } from "ethers";
import ContractAbi from "../../../supplychain-app/artifacts/contracts/ProductRegistry.sol/ProductRegistry.json";

export async function getContract(provider) {
  const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
  const signer = await provider.getSigner();
  return new ethers.Contract(contractAddress, ContractAbi.abi, signer);
}
