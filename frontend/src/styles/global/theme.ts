import { extendTheme } from '@chakra-ui/react'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

const theme = extendTheme({
  fonts: {
    poppins: poppins.style.fontFamily,
  },
  textStyles: {
    h1: {
      fontSize: '2.5rem',
      fontFamily: 'poppins',
      fontWeight: '700',
    },
    h2: {
      fontSize: '1.5rem',
      fontFamily: 'poppins',
    },
  },
  styles: {
    global: {
      body: {
        fontFamily: 'poppins',
      },
    },
  },
})

export default theme
