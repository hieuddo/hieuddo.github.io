import { Box } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box align="center" opacity={0.4} fontSize="sm">
      &copy; {new Date().getFullYear()} Jaime Hieu Do. All Rights Reserved. <br />
      Template from <a href='https://www.craftz.dog/' target='_blank'>Takuya</a>.
    </Box>
  )
}

export default Footer
