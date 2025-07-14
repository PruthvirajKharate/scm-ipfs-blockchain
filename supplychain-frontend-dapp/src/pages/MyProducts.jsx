import React from "react";
import { Card, Button } from "antd";

const productList = [
  {
    id: "12er34343d",
    batchId: "23f342",
    name: "Jewelry",
    description: "Tanishq Maharaj Edition. Summer Collection. 22gm 24 carat.",
    category: "Luxury",
    price: "24000",
  },
  {
    id: "12er34566d",
    batchId: "43f387",
    name: "Kundan Farms Banana",
    description:
      "Kundan Farms. Fresh Product, 1kg per dozen. A-quality validated. ",
    category: "Batch",
    price: "10000",
  },
  {
    id: "12er88883d",
    batchId: "23xrfe3",
    name: "Electronic Lifts",
    description:
      "LG 100kg weigh zone. Safety precautions. Ifsc security predicted",
    category: "Electronics",
    price: "233444",
  },
  {
    id: "79er34343d",
    batchId: "73f342",
    name: "Painting",
    description: "Shri Subhay Art Exhibition, Sintor painter",
    category: "Luxury",
    price: "34354",
  },
  {
    id: "12er34343d",
    batchId: "23f342",
    name: "Jewelry",
    description: "Tanishq Maharaj Edition. Summer Collection. 22gm 24 carat.",
    category: "Luxury",
    price: "24000",
  },
];

function MyProducts() {
  return (
    <Card title="Products">
      {productList.map((e) => {
        return (
          <div>
            <Card style={{margin: "10px 10px 10px 10px"}}>
              <div>Id: {e.id}</div>
              <div>Batch Id: {e.batchId}</div>
              <div>Name: {e.name}</div>
              <div>Description: {e.description}</div>
              <div>Category: {e.category}</div>
              <div>Price: {e.price}</div>
              <Button type="primary">Verify Product</Button>
            </Card>
          </div>
        );
      })}
    </Card>
  );
}

export default MyProducts;
