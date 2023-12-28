import React from 'react'
import ProductList from "../features/product/components/ProductList"
import { Link } from 'react-router-dom'
const HomePage = () => {
  return (
    <div>
     <Link to={'/myorders'}> Touch </Link>
            <ProductList/>
        
    </div>
  )
}

export default HomePage