import { React, useEffect, useState } from "react";
import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setData } from "../redux/slice/QrData"; // Redux action

const QrScanner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [scanResult, setScanResult] = useState("");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 250,
    });

    scanner.render(
      (decodedText) => {
        setScanResult(decodedText);
        dispatch(setData(decodedText)); // Save in Redux
        
        const productId = extractProductId(decodedText); // Extract the product ID
        if (productId) {
          scanner.clear();
          navigate(`/s_product/${productId}`); // Redirect with ID
        }
      },
      (errorMessage) => {
        console.error("QR Scan Error:", errorMessage);
      }
    );

    return () => scanner.clear();
  }, [dispatch, navigate]);

  // Function to extract the product ID from scanned text
  const extractProductId = (decodedText) => {
    try {
      const jsonData = JSON.parse(decodedText); // If QR contains JSON data
      return jsonData.id || null; // Assuming the QR code has {"id": "12345"}
    } catch {
      return decodedText; // Otherwise, return the scanned text directly
    }
  };

  // Handle QR code image upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const html5QrCode = new Html5Qrcode("reader");
      const result = await html5QrCode.scanFile(file, true);

      setScanResult(result);
      dispatch(setData(result)); // Save in Redux

      const productId = extractProductId(result);
      if (productId) {
        navigate(`/s_product/${productId}`);
      }
    } catch (error) {
      console.error("File scan error:", error);
    }
  };

  return (
    <div>
      <h2>Scan Product QR Code</h2>
      <div id="reader"></div>
      <p>OR</p>
      <input type="file" accept="image/*" onChange={handleFileUpload} />
      {scanResult && <p>Scanned Data: {scanResult}</p>}
    </div>
  );
};

export default QrScanner;
