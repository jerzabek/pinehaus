'use client'

import { Container, Flex, Spinner, useToast } from '@chakra-ui/react'
import { FormikHelpers } from 'formik'
import { useUser } from 'hooks/authentication'
import { redirect, useRouter } from 'next/navigation'

import { createProduct } from 'api/Product/repository'
import { ProductForm, ProductFormValues } from 'components/Product'
import { useErrorToast, useSavingToast, useSuccessToast } from 'components/Toast'
import { productPageUrl } from 'utils/pages'

export default function ProductCreatePage() {
  const { isUserLoading, isAuthenticated, user } = useUser()

  const { close } = useToast()

  const showSavingToast = useSavingToast()
  const showSuccessToast = useSuccessToast()
  const showErrorToast = useErrorToast()

  const { push } = useRouter()

  const handleSubmit = (values: ProductFormValues, helpers: FormikHelpers<ProductFormValues>) => {
    const toastId = showSavingToast()

    createProduct(values)
      .then(product => {
        showSuccessToast()

        push(productPageUrl(product.id, product.slug))
      })
      .catch(e => {
        console.error(e)
        showErrorToast()
      })
      .finally(() => {
        helpers.setSubmitting(false)
        close(toastId)
      })
  }

  if (isUserLoading) {
    return (
      <Flex justify="center" align="center">
        <Spinner />
      </Flex>
    )
  }

  if (!isAuthenticated || !user) {
    redirect(`/login`)
  }

  return (
    <Container maxW="container.xl" py={16}>
      <ProductForm handleSubmit={handleSubmit} w="100%" />
    </Container>
  )
}
