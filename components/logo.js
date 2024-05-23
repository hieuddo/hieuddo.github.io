import { Text, useColorModeValue } from '@chakra-ui/react'
import styled from '@emotion/styled'
import Link from 'next/link'
import PageHeaderIcon from './icons/header-icon'

const LogoBox = styled.span`
  font-weight: bold;
  font-size: 22px;
  display: inline-flex;
  align-items: center;
  height: 30px;
  line-height: 20px;
  padding: 10px;

  > svg {
    transition: 200ms ease;
  }

  &:hover > svg {
    transform: rotate(20deg);
  }
`

const Logo = () => {
  return (
    (<Link href="/" scroll={false}>

      <LogoBox>
        <PageHeaderIcon />
        <Text
          color={useColorModeValue('gray.800', 'whiteAlpha.900')}
          fontFamily='San Francisco Pro'
          fontWeight="bold"
          ml={2}
          mt={1.5}
        >
          Jaime Hieu Do
        </Text>
      </LogoBox>

    </Link>)
  );
}

export default Logo
