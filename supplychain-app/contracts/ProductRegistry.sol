//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductRegistry{
    struct Product{
        uint256 id;
        string name;
        string ipfsHash;
        address currentOwner;
        address[] ownershipHistory;
    }
    mapping(uint256=>Product) public products;
    uint256 public productCounter;
    event ProductRegistered(uint256 indexed id, address indexed manufacturer);
    event OwnershipTransferred(uint256 indexed productId, address indexed from, address indexed to);

    function registerProduct(string memory _name, string memory _ipfsHash) public {
        productCounter++;
        Product storage newProduct = products[productCounter];
        newProduct.id=productCounter;
        newProduct.name=_name;
        newProduct.ipfsHash=_ipfsHash;
        newProduct.currentOwner=msg.sender;
        newProduct.ownershipHistory.push(msg.sender);

        emit ProductRegistered(productCounter, msg.sender);
    }

    function transferOwnership(uint256 _id, address _newOwner) public {
        require(msg.sender==products[_id].currentOwner,"Sender is not the owner");
        require(_newOwner !=address(0));
        products[_id].currentOwner=_newOwner;
        products[_id].ownershipHistory.push(msg.sender);

        emit OwnershipTransferred(_id, msg.sender, _newOwner);
    }

    function getProductHistory(uint256 _id) public view returns(address[] memory) {
        return products[_id].ownershipHistory;
    }

    function verifyProduct(uint256 _id)public view returns(string memory, string memory, address){
        Product memory product = products[_id];
        return (product.name, product.ipfsHash, product.currentOwner);
    }
}