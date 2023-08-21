import { Container, Badge, List, ListItem, Heading, Center } from '@chakra-ui/react'
import { Title, Meta } from '../../components/blog'
import Layout from '../../components/layouts/article'
import fs from 'fs'
import matter from 'gray-matter'
import { marked } from 'marked'


const Blog = ({ data }) => {
    const { title, year, createdAt, lastUpdated, tags, description, content } = data

    const paragraphs = content.split('\n\n')
    const html = paragraphs.map(p => `<P>${marked(p, { mangle: false, headerIds: false })}</P>`).join('</br>') + '</br></br>'

    return (
        <Layout title={title}>
            <Container>
                <Title>
                    {title} <Badge>{year}</Badge>
                </Title>

                {/* Meta */}
                <List ml={4} my={4}>
                    <ListItem>
                        <Meta>Created</Meta>
                        <span>{createdAt}</span>
                    </ListItem>
                    <ListItem>
                        <Meta>Last updated</Meta>
                        <span>{lastUpdated}</span>
                    </ListItem>
                    <ListItem>
                        <Meta>Tags</Meta>
                        <span>{tags}</span>
                    </ListItem>
                </List>

                <Heading as="h4" fontSize={16} my={6}>
                    <Center>{description}</Center>
                </Heading>

                <div dangerouslySetInnerHTML={{ __html: html }} />

            </Container>
        </Layout>
    )
}

export default Blog

export async function getStaticProps() {
    const filePath = 'data/blog/2021-08-14-st-john-island.md';
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContent)

    return {
        props: {
            data: {
                title: data.title,
                year: data.year,
                createdAt: data.createdAt,
                lastUpdated: data.lastUpdated,
                tags: data.tags,
                description: data.description,
                content: content
            }
        }
    }
}