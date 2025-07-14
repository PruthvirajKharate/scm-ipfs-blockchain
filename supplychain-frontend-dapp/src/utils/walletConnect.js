import { ethers } from "ethers";

export async function checkConnection(setProvider, setSigner) {
  if (window.ethereum) {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      setProvider(provider);
      setSigner(signer);
      return true;
    } catch (e) {
      return false;
    }
  }
}
