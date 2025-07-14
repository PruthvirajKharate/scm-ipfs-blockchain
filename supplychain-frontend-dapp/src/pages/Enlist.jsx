import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import { useDispatch } from "react-redux";
import { saveProduct } from "../redux/slice/ProductSlice";
import {
  Form,
  Input,
  Select,
  Switch,
  Button,
  Upload,
  Card,
  Spin,
  Alert,
} from "antd";
import {
  UploadOutlined,
  DownloadOutlined,
  FileProtectOutlined,
} from "@ant-design/icons";
import { v4 as uuid } from "uuid";
import { ethers } from "ethers";

const { TextArea } = Input;

const EnlistPage = () => {
  const dispatch = useDispatch();

  // Move ALL state declarations to the top
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({
    id:uuid(),
    batchId:uuid(),
    subBatches: [],
    name: "",
    description: "",
    price: "",
    category: "",
    manufacturer: "",
    license: "",
    address: "",
    contact: "",
    manufactureDate: "",
    countryOfOrigin: "",
    expirationDate: "",
    trackingEnabled: false,
    batchTracking: false,
    subBatchAllowed: false,
    ownershipTransfer: false,
    liveShipmentUpdates: false,
    buyerReviewEnabled: false,
    files: [],
    qrCodeData: "",
  });

  useEffect(() => {
    const checkWallet = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const accounts = await provider.listAccounts();

          if (accounts.length > 0) {
            setProvider(provider);
            setSigner(signer);
            setConnected(true);
          } else {
            setConnected(false);
          }
        } catch (error) {
          console.error("Error connecting to wallet:", error);
          setConnected(false);
        }
      } else {
        console.log("No Ethereum provider found.");
        setConnected(false);
      }
      setLoading(false);
    };

    checkWallet();
  }, []);

  // Early return should NOT be before all useState hooks
  if (loading) {
    return (
      <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
    );
  }

  if (!connected) {
    return (
      <Alert
        message="Wallet not connected. Please connect your wallet to proceed."
        type="error"
        showIcon
      />
    );
  }

  const handleChange = (name, value) => {
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const generateQRCode = async () => {
    console.log("Generating QR code for product:", product.id);
    const productData = JSON.stringify(product.id);
    const qrCode = await QRCode.toDataURL(productData);
    setProduct((prev) => ({ ...prev, qrCodeData: qrCode }));
    dispatch(saveProduct(product));
  };

  const handleFileUpload = (info) => {
    setProduct((prev) => ({
      ...prev,
      files: [...prev.files, { file: info.file, description: "" }],
    }));
  };

  const handleFileDescriptionChange = (index, description) => {
    setProduct((prev) => {
      const updatedFiles = [...prev.files];
      updatedFiles[index].description = description;
      return { ...prev, files: updatedFiles };
    });
  };

  const downloadQRCode = () => {
    const link = document.createElement("a");
    link.href = product.qrCodeData;
    link.download = "product_qr_code.png";
    link.click();
  };

  const enlistProduct = () => {
    console.log("Product enlisted:", product);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <Card title="Enlist a Product">
        <Form layout="vertical">
          <Form.Item label="Product Name">
            <Input
              value={product.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Description">
            <TextArea
              value={product.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Price">
            <Input
              type="number"
              value={product.price}
              onChange={(e) => handleChange("price", e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Category">
            <Select
              value={product.category}
              onChange={(value) => handleChange("category", value)}
            >
              <Select.Option value="luxury">Luxury</Select.Option>
              <Select.Option value="bulk">Bulk Goods</Select.Option>
              <Select.Option value="perishable">Perishable Items</Select.Option>
              <Select.Option value="general">General Items</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Manufacture Date">
            <Input
              type="date"
              value={product.manufactureDate}
              onChange={(e) => handleChange("manufactureDate", e.target.value)}
            />
          </Form.Item>

          {product.category === "perishable" && (
            <Form.Item label="Expiration Date">
              <Input
                type="date"
                value={product.expirationDate}
                onChange={(e) => handleChange("expirationDate", e.target.value)}
              />
            </Form.Item>
          )}

          <Form.Item label="County of Origin">
            <Form.Item label="Country of Origin">
              <TextArea
                value={product.countryOfOrigin}
                onChange={(e) =>
                  handleChange("countryOfOrigin", e.target.value)
                }
              />
            </Form.Item>
          </Form.Item>

          <Form.Item label="Enable Tracking">
            <Switch
              checked={product.trackingEnabled}
              onChange={(checked) => handleChange("trackingEnabled", checked)}
            />
          </Form.Item>

          <Form.Item label="Batch Tracking">
            <Switch
              checked={product.batchTracking}
              onChange={(checked) => handleChange("batchTracking", checked)}
            />
          </Form.Item>

          {product.batchTracking && (
            <Form.Item label="Sub-Batch Allowed">
              <Switch
                checked={product.subBatchAllowed}
                onChange={(checked) => handleChange("subBatchAllowed", checked)}
              />
            </Form.Item>
          )}

          <Form.Item label="Ownership Transfer">
            <Switch
              checked={product.ownershipTransfer}
              onChange={(checked) => handleChange("ownershipTransfer", checked)}
            />
          </Form.Item>

          <Form.Item label="Live Shipment Updates">
            <Switch
              checked={product.liveShipmentUpdates}
              onChange={(checked) =>
                handleChange("liveShipmentUpdates", checked)
              }
            />
          </Form.Item>

          <Form.Item label="Upload Documents">
            <Upload beforeUpload={() => false} onChange={handleFileUpload}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            {product.files.map((file, index) => (
              <div key={index} style={{ marginTop: "10px" }}>
                <Input
                  placeholder="Describe this file"
                  value={file.description}
                  onChange={(e) =>
                    handleFileDescriptionChange(index, e.target.value)
                  }
                />
              </div>
            ))}
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={generateQRCode}>
              Generate QR Code
            </Button>
          </Form.Item>

          {product.qrCodeData && (
            <>
              <img
                src={product.qrCodeData}
                alt="QR Code"
                style={{ marginTop: "16px" }}
              />
              <Button
                icon={<DownloadOutlined />}
                onClick={downloadQRCode}
                style={{ marginTop: "10px" }}
              >
                Download QR Code
              </Button>
              <Button onClick={enlistProduct} style={{ marginLeft: "10px" }}>
                Submit
              </Button>
            </>
          )}
        </Form>
      </Card>
    </div>
  );
};

export default EnlistPage;
