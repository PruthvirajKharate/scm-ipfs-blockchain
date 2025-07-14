# Blockchain-Based Supply Chain Management System

This project is a decentralized Supply Chain Management (SCM) system built using blockchain and IPFS. It is designed to bring transparency, traceability, and security to the supply chain process by recording product movement and metadata on a tamper-proof, decentralized ledger.

## Overview

The SCM DApp allows participants like manufacturers, distributors, and retailers to:
- Register themselves on the blockchain
- Add and update product lifecycle events
- Upload product-related documents (e.g., certificates, receipts) to IPFS
- Track provenance and verify product authenticity

## Key Features

### Blockchain Integration
- Tracks every product transaction on-chain
- Smart contracts enforce permissions and lifecycle events
- Ensures immutability and auditability

### IPFS Integration
- Documents and certificates are uploaded to IPFS
- Only hashes are stored on-chain to minimize gas fees
- Documents are accessible via hash from any IPFS gateway

### Roles and Access Control
- Supports Manufacturer, Supplier, Distributor, Retailer roles
- Only authorized roles can perform specific actions
- Transparent ownership handover at each supply chain stage

### Transparency and Trust
- Each stakeholder can view product history
- Tamper-proof audit trail increases consumer and regulator confidence

## Technology Stack

| Layer         | Tech                         |
|---------------|------------------------------|
| Blockchain     | Ethereum (Smart Contracts)   |
| Smart Contracts| Solidity (Remix or Hardhat)  |
| IPFS           | Web3.Storage / Infura        |
| Backend        | Node.js / Spring Boot (custom) |
| Frontend       | React / HTML-CSS (optional)  |
| Wallet         | MetaMask                     |


