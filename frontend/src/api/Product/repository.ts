import { ProductFormValues } from 'components/Product/ProductForm'
import { Product } from 'model/Product'
import { getJson, postJson, putJson } from 'utils/api'

import * as I from './interface'
import * as R from './routes'

export const getProducts = (query: I.ProductListFilters) => getJson<I.ProductListResponse>(R.getProductList(query))

export const getProduct = (id: number) => getJson<I.GetProductResponse>(R.getProduct(id), {})

export const updateProduct = (id: number, payload: ProductFormValues) => putJson<Product>(R.updateProduct(id), payload)

export const createProduct = (payload: ProductFormValues) => postJson<Product>(R.createProduct(), payload)
