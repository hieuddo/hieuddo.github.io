import { Box, Button, Container, Heading, Link, List, ListItem, chakra } from '@chakra-ui/react'
import Image from 'next/image'
import { IoLogoGithub, IoLogoLinkedin, IoLogoTwitter, IoMail } from 'react-icons/io5'
import Layout from '../components/layouts/article'
import { NewsData, NewsRow, NewsTable } from '../components/news'
import Paragraph from '../components/paragraph'
import Section from '../components/section'

const ProfileImage = chakra(Image, {
  shouldForwardProp: prop => ['width', 'height', 'src', 'alt'].includes(prop)
})

const Home = () => (
  <Layout>
    <Container>

      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title">
            Jaime Hieu Do
          </Heading>
          <p>PhD Candidate in Computer Science</p>
        </Box>
        <Box
          flexShrink={0}
          mt={{ base: 4, md: 0 }}
          ml={{ md: 6 }}
          textAlign="center"
        >
          <Box
            borderColor="whiteAlpha.800"
            borderWidth={2}
            borderStyle="solid"
            w="128px"
            h="128px"
            display="inline-block"
            borderRadius="full"
            overflow="hidden"
          >
            <ProfileImage
              src="/images/profile.jpg"
              alt="Profile image"
              borderRadius="full"
              width="128"
              height="128"
            />
          </Box>
        </Box>
      </Box>

      <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          About Me
        </Heading>
        <Paragraph>
          Xin chào (Hello)!
          I am currently a PhD candidate at <Link href="https://preferred.ai/" target="_blank">Preferred.AI</Link> and SMU School of Computing and Information Systems, advised by <Link href="https://www.hadylauw.com/" target="_blank">Prof. Hady W. Lauw</Link>. Previously, I obtained my B.Sc. degree in Computer Science at University of Engineering and Technology, Vietnam National University, Hanoi, under the supervision of Dr. Mai-Vu Tran and <Link href="https://sites.google.com/view/trongld" target="_blank">Dr. Duc-Trong Le</Link>.
          <br /> <br />
          My primary area of research revolves around the formulation and solution of dynamic real-world recommender systems, including session-based, cross-domain, multi-task, and continual learning settings for recommendations.
        </Paragraph>

      </Section>

      <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
          News
        </Heading>
        <NewsTable>
          <NewsRow>
            <NewsData><strong>2024.05</strong></NewsData>
            <NewsData>Volunteered at The Web Conference 2024 in Singapore</NewsData>
          </NewsRow>
          <NewsRow>
            <NewsData><strong>2023.09</strong></NewsData>
            <NewsData>Attended and presented poster at RecSys'2023 in Singapore. <Link href="https://preferred.ai/recsys-2023-in-singapore/" target="_blank">Blog post.</Link>
            </NewsData>
          </NewsRow>
          <NewsRow>
            <NewsData><strong>2023.07.22</strong></NewsData>
            <NewsData>Paper accepted at RecSys-23, Late-Breaking Results (LBR) track, titled “Continual Collaborative Filtering Through Gradient Alignment”</NewsData>
          </NewsRow>
          <NewsRow>
            <NewsData><strong>2021.11.19</strong></NewsData>
            <NewsData>Passed Qualifying Exam</NewsData>
          </NewsRow>
          <NewsRow>
            <NewsData><strong>2020.08.14</strong></NewsData>
            <NewsData>Joined Ph.D. program at SMU School of Computing and Information Systems</NewsData>
          </NewsRow>
          <NewsRow>
            <NewsData><strong>2020.07.28</strong></NewsData>
            <NewsData>Graduated from VNU-UET (Summa Cum Laude) with Excellent Thesis Award</NewsData>
          </NewsRow>
        </NewsTable>
      </Section>

      <Section delay={0.3}>
        <Heading as="h3" variant="section-title">
          Teaching Assistant
        </Heading>
        <NewsTable>
          <NewsRow>
            <NewsData><strong>AY2024/2025 Term 1<br />AY2022/2023 Term 1</strong></NewsData>
            <NewsData>IS712 Machine Learning</NewsData>
          </NewsRow>
          <NewsRow>
            <NewsData><strong>AY2023/2024 Term 3<br />AY2022/2023 Term 3</strong></NewsData>
            <NewsData>CS608 Recommender Systems</NewsData>
          </NewsRow>
        </NewsTable>

      </Section>

      <Section delay={0.3}>
        <Heading as="h3" variant="section-title">
          Academic Service
        </Heading>
        <NewsTable>
          <NewsRow>
            <NewsData><strong>Journal Reviewer</strong></NewsData>
            <NewsData>TORS 2024</NewsData>
          </NewsRow>
        </NewsTable>
      </Section>

      <Section delay={0.3}>
        <Heading as="h3" variant="section-title">
          On the web
        </Heading>
        <List>
          <ListItem>
            <Link href="https://github.com/hieuddo" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoGithub />}
              >
                @hieuddo
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="mailto:dinhhieu.do.2020@smu.edu.sg" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoMail />}
              >
                dinhhieu.do.2020@smu.edu.sg
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://twitter.com/hieeudd" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoTwitter />}
              >
                @hieeudd
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://www.linkedin.com/in/hieuddo/" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoLinkedin />}
              >
                @hieuddo
              </Button>
            </Link>
          </ListItem>
        </List>

        {/* <SimpleGrid columns={[1, 2]} gap={6}>
          <BlogGridItem
            href="https://preferred.ai/"
            title="Preferred.AI"
            thumbnail={"/images/thumbnail/preferredai.png"}
          >
            Our research group
          </BlogGridItem>
          <BlogGridItem
            href=""
            title=""
            thumbnail="/images/preferred.png"
          >
            Placeholder
          </BlogGridItem>
        </SimpleGrid> */}

      </Section>
    </Container>
  </Layout>
)

export default Home
export { getStaticProps } from '../components/chakra'
