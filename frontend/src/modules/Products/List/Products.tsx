import { getProducts } from 'api/Product/repository'

import { ProductList } from './components'

export default async function Products() {
  let products

  try {
    products = await getProducts({})
  } catch (e) {
    console.error(e)
    return null
  }

  return (
    <>
      <ProductList products={products.products} totalPages={products.totalPages} />
    </>
  )
}