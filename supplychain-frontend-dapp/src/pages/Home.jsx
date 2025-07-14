import React from "react";
import { getContract } from "../utils/contract";
import { useSelector } from "react-redux";
import { useState } from "react";
import WebConnect from "../components/WebConnect";
import heroPhoto from "../assets/image.png";
import { Button, Modal } from "antd";
import "./Home.css";
import QRScanner from "../components/QrScanner";
import { QrcodeOutlined } from "@ant-design/icons";

function Home() {
  const [provider, setProvider] = useState(null);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [signer, setSigner] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  const account = useSelector((state) => state.wallet.account);
  const productId = useSelector((state) => state.qrData.data);

  async function fetchContractData() {
    if (!provider) return alert("Connect Wallet First!");

    const contract = await getContract(provider);

    console.log(contract); // Example function
    console.log("Contract Owner");
  }
  return (
    <div>
      <div className="hero-section">
        <div className="hero-text">
          <h1>Trust, Believe, Transact</h1>
          <ul>
            <li>Trustless Product Management</li>
            <li>Transparency and Reliability</li>
            <li>Decentralized Storage</li>
            <li>Secured Digital Identity</li>
          </ul>
        </div>
        <div className="hero-img">
          <img src={heroPhoto} alt="" />
        </div>
      </div>

      <div className="home-scanner">
        <div className="qr-scan-info">
          <h1>Scan Product QR Code</h1>
          <p>
            Scan the QR code on the product to view its details and verify its
            authenticity.
          </p>
        </div>
        <div className="qr-feature">
          <Button type="primary" onClick={() => setIsScannerOpen(true)}>
            <QrcodeOutlined/>
            <span>Scan QR code</span>
          </Button>

          <Modal
            title="Scan Product QR Code"
            open={isScannerOpen}
            onCancel={() => setIsScannerOpen(false)}
            footer={null}
          >
            <QRScanner onScanSuccess={(data) => setScannedData(data)} />
          </Modal>

          {scannedData && <p>Product Data: {scannedData}</p>}
        </div>
      </div>

      <h1>Supply chain management</h1>
      <WebConnect setProvider={setProvider} setSigner={setSigner} />
      <p>Account Connected: {account}</p>
      <button onClick={fetchContractData}>Fetch contract data</button>

      <div>
        <h1>Product Data</h1>
        <p>Product Data will be displayed here</p>
        {productId && <p>Product ID: {productId}</p>}
      </div>
    </div>
    
  );
}

export default Home;
