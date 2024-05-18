'use client'

import { ChevronRight, Edit } from '@carbon/icons-react'
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Divider,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useUser } from 'hooks/authentication'
import Image from 'next/image'
import Link from 'next/link'

import { image } from 'api/routes'
import NumberInput from 'components/NumberInput'
import { Product } from 'model/Product'
import { ProductAttributeType } from 'model/Product/ProductAttribute'
import { categoryPageUrl, productEditUrl, productPageUrl } from 'utils/pages'

interface Props {
  product: Product
}

export default function ProductPage({ product }: Props) {
  const { user } = useUser()

  const breadcrumbBarBg = useColorModeValue('yellow.200', 'orange.700')

  const hasAttributesWithOptions = product.attributes.some(
    ({ attribute }) => !!attribute.options && attribute.options.length > 0
  )

  return (
    <>
      <Flex h="70px" bg={breadcrumbBarBg} align="center">
        <Container maxW="container.xl" py={16}>
          <Breadcrumb spacing="8px" separator={<ChevronRight color="gray.500" />}>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Pinehaus</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href={categoryPageUrl(product.category.id, product.category.name)}>
                {product.category.name}
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href={productPageUrl(product.id, product.slug)}>{product.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Container>
      </Flex>

      <Container maxW="container.xl" py={16}>
        <Flex justify="space-between" align="flex-start">
          <Box border="1px solid" borderColor="gray.300" borderRadius={4}>
            <Image src={product.thumbnail ?? image('noimage.png')} alt={product.name} width={500} height={500} />
          </Box>

          <Box w="600px">
            <Flex justify="space-between" align="center">
              <Text fontSize={42}>{product.name}</Text>

              {product.createdBy.id === user?.id && (
                <Button
                  variant="outline"
                  size="sm"
                  colorScheme="green"
                  as={Link}
                  href={productEditUrl(product.id, product.slug)}
                >
                  <Flex align="center" gap={2}>
                    <Edit /> Edit
                  </Flex>
                </Button>
              )}
            </Flex>
            <Text fontSize={24} opacity={0.7} mb={2}>
              {product.price} &euro;
            </Text>
            <Divider mb={4} />
            <Box minH="140px" mb={4}>
              <Text>{product.description}</Text>
            </Box>

            <Divider my={4} />

            {hasAttributesWithOptions && (
              <Box mb={8}>
                <Text fontSize={18} mb={4}>
                  Select options:
                </Text>

                {product.attributes
                  .filter(({ attribute }) => attribute.type === ProductAttributeType.ENUM)
                  .map(({ attribute, value }) => {
                    let attributeOptions = value.split(',')

                    if (!attributeOptions.length) attributeOptions = attribute.options as string[]

                    return (
                      <Box key={attribute.id} mb={4}>
                        <Text opacity={0.7}>{attribute.name}</Text>

                        <Flex>
                          {attributeOptions.map(option => (
                            <Button key={option} variant="outline" size="sm" mr={4}>
                              {option}
                            </Button>
                          ))}
                        </Flex>
                      </Box>
                    )
                  })}
              </Box>
            )}
            <Flex gap={8}>
              <NumberInput inputProps={{ placeholder: 'Quantity', w: '70px' }} />

              <Button variant="outline" size="lg">
                Add to cart
              </Button>
            </Flex>
            <Divider my={4} />
            <Text fontSize={18} mb={4}>
              Details:
            </Text>
            {product.attributes
              .filter(({ attribute }) => attribute.type !== ProductAttributeType.ENUM)
              .map(({ attribute, value }) => (
                <Flex key={attribute.id} mb={4}>
                  <Box w="160px" opacity={0.7}>
                    <Text>{attribute.name}</Text>
                  </Box>

                  <Text mx={4} opacity={0.7}>
                    :
                  </Text>

                  <Text opacity={0.7}>{value}</Text>
                </Flex>
              ))}
          </Box>
        </Flex>
      </Container>
    </>
  )
}