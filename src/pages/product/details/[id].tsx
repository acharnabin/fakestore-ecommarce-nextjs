import ProductBannerCard from '@/components/Products/ProductBannerCard'
import { useParams } from 'next/navigation'

import React from 'react'

const ProductDetailsPage= () => {
  const p=useParams()
  
  return (
    <ProductBannerCard id={Number(p?.id)} />
  )
}

export default ProductDetailsPage