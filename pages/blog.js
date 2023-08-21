import { Container, Heading, SimpleGrid } from '@chakra-ui/react';
import Layout from '../components/layouts/article';
import Section from '../components/section';
import { BlogGridItem } from '../components/grid-item';
import { getBlogData } from '../lib/fetchBlogData';

export const getStaticProps = async () => {
  const blogData = getBlogData();

  return {
    props: {
      blogData,
    },
  };
};

const Blog = ({ blogData }) => (
  <Layout title="Blog">
    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
        Blog
      </Heading>

      <SimpleGrid columns={[1, 1, 2]} gap={6}>
        {blogData.map((data, index) => (
          <Section key={index}>
            <BlogGridItem
              id={data.slug}
              title={data.title}
              thumbnail={data.heroImage}
            >
              {data.description}
            </BlogGridItem>
          </Section>
        ))}
      </SimpleGrid>
    </Container>
  </Layout>
);

export default Blog;
