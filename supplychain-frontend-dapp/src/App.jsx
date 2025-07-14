import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  QrcodeOutlined
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Button, theme, Modal } from "antd";
import QRScanner from "./components/QrScanner";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "./redux/slice/QrData";

// Import pages
import Home from "./pages/Home";
import Enlist from "./pages/Enlist";
import Verification from "./pages/Verification";
import MyProducts from "./pages/MyProducts";
import About from "./pages/About";
import "./App.css";
import WebConnect from "./components/WebConnect";
import History from "./pages/History";
import ProductData from "./pages/ProductData";


const { Header, Content, Sider } = Layout;

const items1 = [
  {
    key: "logo",
    label: (
      <div className="Logo" style={{ fontSize: "24px" }}>
        ScoBo
      </div>
    ),
  },
  { key: "home", label: <Link to="/">Home</Link> },
  { key: "enlist", label: <Link to="/enlist">Enlist</Link> },
  { key: "verification", label: <Link to="/verification">Verification</Link> },
  { key: "myproducts", label: <Link to="/myproducts">My Products</Link> },
  { key: "about", label: <Link to="/about">About</Link> },
];

const SiderElement = [
  {
    key: "account",
    label: "Account",
    icon: <UserOutlined />,
    children: [
      {
        key: "connect",
        label: (
          <div>
            <Button>Connect</Button>
          </div>
        ),
      },
      { key: "history", label: <Link to="/history">Account History</Link> },
      { key: "profile", label: "Profile" },
    ],
  },
  {
    key: "products",
    label: "Products", // Fixed typo
    icon: <LaptopOutlined />,
    children: [
      { key: "badges", label: "Badges" },
      { key: "transactions", label: "Transactions" },
    ],
  },
  {
    key: "notifications",
    label: "Notifications",
    icon: <NotificationOutlined />,
    children: [
      { key: "alerts", label: "Alerts" },
      { key: "messages", label: "Messages" },
    ],
  },
  {
    key: "settings",
    label: "Settings",
    icon: <UserOutlined />,
    children: [
      { key: "account-settings", label: "Account" },
      { key: "profile-settings", label: "Profile" },
    ],
  },
];

const App = () => {
  const scannedData = useSelector((state)=>state.qrData.data);
  const [collapsed, setCollapsed] = useState(false);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  

  const dispatch = useDispatch();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Router>
      <Layout>
        {/* Header with Mobile Toggle Button */}
        <Header
          style={{ display: "flex", alignItems: "center", padding: "0 16px" }}
        >
          {/* Sidebar Toggle Button (Visible on Mobile) */}
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 40,
              height: 40,
              marginRight: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["home"]}
            items={items1}
            style={{ flex: 1 }}
          />
          <div className="qr-scanner">
            <Button type="primary" onClick={() => setIsScannerOpen(true)}>
              <QrcodeOutlined /> 
            </Button>

            <Modal
              title="Scan Product QR Code"
              open={isScannerOpen}
              onCancel={() => setIsScannerOpen(false)}
              footer={null}
            >
              <QRScanner onScanSuccess={(data) => dispatch(setData(data))} />
            </Modal>

            {scannedData && <p>Product Data: {scannedData}</p>}
          </div>
          <WebConnect setProvider={setProvider} setSigner={setSigner} />
        </Header>

        <Layout>
          {/* Collapsible Sidebar */}
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            breakpoint="md" // Auto-collapse on small screens
            collapsedWidth="0" // Hide sidebar completely when collapsed
            style={{ background: colorBgContainer }}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
              items={SiderElement}
            />
          </Sider>

          {/* Main Content */}
          <Layout style={{ padding: "0 24px 24px" }}>
            <Breadcrumb
              items={[
                { title: <Link to="/">Home</Link> },
                { title: <Link to="/enlist">Enlist</Link> },
                { title: <Link to="/verification">Verification</Link> },
                { title: <Link to="/myproducts">My Products</Link> },
                { title: <Link to="/about">About</Link> },
              ]}
              style={{ margin: "16px 0" }}
            />
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
                overflow: "auto", // Prevents content overflow
                width: "100%",
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/enlist" element={<Enlist />} />
                <Route path="/verification" element={<Verification />} />
                <Route path="/myproducts" element={<MyProducts />} />
                <Route path="/about" element={<About />} />
                <Route path="/history" element={<History />}></Route>
                <Route path="/s_product/:id" element={<ProductData />}></Route>
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
