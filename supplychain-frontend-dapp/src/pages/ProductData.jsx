import React from 'react'
import { useParams } from 'react-router-dom'

function ProductData() {
    const {id} = useParams();
  return (
    <div>
      Product Id: {id}
    </div>
  )
}

export default ProductData
