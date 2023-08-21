import Head from 'next/head'
import NavBar from '../navbar'
import { Box, Container } from '@chakra-ui/react'
import Footer from '../footer'
import { headerIcon } from '../icons/header-icon.js';

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Jaime's homepage" />
        <meta name="author" content="Jaime Hieu Do" />
        <meta name="author" content="Jaime Hieu Do" />
        <link rel="apple-touch-icon" href={headerIcon} />
        <link rel="shortcut icon" href={headerIcon} type="image/x-icon" />
        <meta name="twitter:title" content="Jaime Hieu Do" />
        <meta property="og:site_name" content="Jaime Hieu Do" />
        <meta name="og:title" content="Jaime Hieu Do" />
        <meta property="og:type" content="website" />
        <title>Jaime Hieu Do - Homepage</title>
      </Head>

      <NavBar path={router.asPath} />

      <Container maxW="container.md" pt={14}>

        {children}

        <Footer />
      </Container>
    </Box>
  )
}

export default Main
