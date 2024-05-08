export enum ProductAttributeType {
  ENUM = 'ENUM',
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  BOOLEAN = 'BOOLEAN',
}

export interface ProductAttribute {
  id: number
  name: string
  type: ProductAttributeType
  value: string
  options: string[] | null
}

export interface ProductAttributeValue {
  attribute: ProductAttribute
  value: string
}
