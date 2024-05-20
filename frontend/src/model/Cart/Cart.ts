export interface Cart {
  items: CartItem[]
  /** Last time cart was modified. If cart is stale it is automatically cleared. */
  lastModified: number
}

export interface CartItem {
  product: number
  attributes: Array<{
    id: number
    name: string
    value: number
  }>
  quantity: number
}
