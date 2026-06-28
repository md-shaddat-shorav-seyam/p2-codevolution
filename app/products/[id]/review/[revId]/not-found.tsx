"use client"
import React from 'react'
import { usePathname } from 'next/navigation'
function Notfound() {
  const pathname =usePathname()
  const productId = pathname.split("/")[2]
  const reviewId = pathname.split("/")[4]

  return (
    <div>review {reviewId} not-found for product {productId}</div>
  )
}

export default Notfound