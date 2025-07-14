import React, { useState } from "react";
import { Card, Layout, Form, Input, Button } from "antd";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { setAccount } from "../redux/slice/WalletSlice";
import { useDispatch } from "react-redux";

function Verification() {
  const [product, setProduct] = React.useState({
    id: "",
  });
  const dispatch = useDispatch();
  const [isSubmitted, setSubmit] = useState(false);

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [accountNo, setAccountNo] = useState("");

  const handleChange = (name, value) => {
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  async function verifyProduct() {
    // Logic to verify the product using the product ID
    console.log("Verifying product with ID:", product.id);
    // Here you would typically call a smart contract function or an API
    const web3Modal = new Web3Modal();
    const instance = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(instance);
    const signer = await provider.getSigner();
    const account = await signer.getAddress();
    setAccountNo(account);

    dispatch(setAccount(account));
    setProvider(provider);
    setSigner(signer);
    setSubmit(true);

    // This function will send the transaction to the smart contract
  }

  return (
    <div>
      <h1>Check Validity of Product</h1>
      <Card title="Validate Product">
        <Form layout="vertical">
          <Form.Item label="Product Id">
            <Input
              value={product.id}
              onChange={(e) => handleChange("id", e.target.value)}
            ></Input>
          </Form.Item>
          <Button onClick={verifyProduct} type="primary">
            Verify
          </Button>
        </Form>
      </Card>
      <div id="result">{/* Display verification result here */}</div>
      {isSubmitted && (
        <Card title="Verified Product">
          <div>Product Id: {product.id}</div>
          <div>Manufacturer address: {accountNo} </div>
        </Card>

      )}
    </div>
  );
}

export default Verification;
