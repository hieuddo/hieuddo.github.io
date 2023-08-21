import { Box, Text, Link, Button } from '@chakra-ui/react'
import { AiFillFilePdf } from 'react-icons/ai'
import { SiAcm } from 'react-icons/si'
import { IoLogoGithub } from 'react-icons/io5'

const Publication = ({ paperName, authors, conferenceName, time, pdf, DOI, code }) => (
    <Box borderRadius="lg" overflow="hidden" p="4">
        <Text fontWeight="bold" fontSize="xl" mb="2">
            {paperName}
        </Text>
        <Text fontSize="md" mb="2">
            by {authors}
        </Text>
        <Text fontSize="md" mb="2">
            {conferenceName}, {time}
        </Text>
        {pdf && (
            <Link href={pdf} target="_blank">
                <Button
                    variant="ghost"
                    colorScheme="teal"
                    leftIcon={<AiFillFilePdf />}
                >
                    PDF
                </Button>
            </Link>
        )}
        {DOI && (
            <Link href={DOI} target="_blank">
                <Button
                    variant="ghost"
                    colorScheme="teal"
                    leftIcon={<SiAcm />}
                >
                    ACM
                </Button>
            </Link>
        )}
        {code && (
            <Link href={code} target="_blank">
                <Button
                    variant="ghost"
                    colorScheme="teal"
                    leftIcon={<IoLogoGithub />}
                >
                    Code
                </Button>
            </Link>
        )}

    </Box >
)

export default Publication