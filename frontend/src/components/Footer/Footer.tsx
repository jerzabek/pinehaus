import { Box, Flex, Text } from '@chakra-ui/react'

import Link from 'components/Link'

export default function Footer() {
  return (
    <Box
      borderTop="1px solid"
      borderTopColor="gray.300"
      p={['48px 20px 36px', '48px 40px 36px', '48px 100px 36px']}
      w="100%"
    >
      <Flex
        borderBottom="1px solid"
        borderBottomColor="gray.300"
        justify="space-between"
        pb="48px"
        mb="36px"
        flexDirection={['column', 'column', 'row']}
      >
        <Box flex={1}>
          <Text fontWeight="bold" fontSize={32} mb={12}>
            Pinehaus
          </Text>
        </Box>

        <Box flex={1} mb={[6, 6, 0]}>
          <Text color="gray.500" mb={8}>
            Links
          </Text>

          <Flex direction="column" gap={6} ml={[4, 4, 0]}>
            <Link href={`/`}>Home</Link>
            <Link href={`/products`}>Products</Link>
          </Flex>
        </Box>

        <Box flex={1}>
          <Text color="gray.500" mb={8}>
            Help
          </Text>

          <Flex direction="column" gap={6} ml={[4, 4, 0]}>
            <Link href={`/`}>Home</Link>
          </Flex>
        </Box>
        <Box flex={1} />
      </Flex>

      <Text as="p">2024 Pinehaus. All rights reserved</Text>
    </Box>
  )
}
