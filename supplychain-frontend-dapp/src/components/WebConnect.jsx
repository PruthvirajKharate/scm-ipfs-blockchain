import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import MetamaskLogo from "../assets/MetamaskLogo.png";
import { setAccount } from "../redux/slice/WalletSlice";
import { useDispatch } from "react-redux";
import "./WebConnect.css";

function WebConnect({ setProvider, setSigner }) {
  const dispatch = useDispatch();
  const [connected, setConnected] = useState(false);
  async function connectWallet() {
    const web3Modal = new Web3Modal();
    const instance = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(instance);
    const signer = await provider.getSigner();
    const account = await signer.getAddress();

    dispatch(setAccount(account));
    setProvider(provider);
    setSigner(signer);
    setConnected(true);
  }

  return (
    <button onClick={connectWallet}>
      <img src={MetamaskLogo} alt="Metamask Logo" />
      <span>Connect with Metamask</span>
    </button>
  );
}

export default WebConnect;
