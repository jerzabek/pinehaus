import { ChevronRight } from '@carbon/icons-react'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'

import CartPage from 'modules/Cart'

export default function page() {
  return (
    <>
      <Box w="100%" h="350px" position="relative">
        <Image
          src="/images/banners/cart-banner.jpg"
          alt="Product page banner"
          sizes="100vw"
          style={{
            opacity: 0.3,
            zIndex: -1,
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          fill
        />

        <Flex flexDir="column" justify="center" align="center" h="100%">
          <Text as="h1" textStyle="h1">
            Your shopping cart
          </Text>

          <Breadcrumb spacing="8px" separator={<ChevronRight color="gray.500" />} mb={2}>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Pinehaus</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="/cart">Cart</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>
      </Box>

      <CartPage />
    </>
  )
}
