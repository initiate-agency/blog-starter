import { GetStaticProps } from 'next'
import Link from 'next/link'
import { getTags, Tags } from '@/cms'

import { Container } from '@/components/Container'

type TagsPageProps = {
  tags: Tags
}

export default function TagsPage({ tags }: TagsPageProps) {
  return (
    <Container>
      <h1>Tags</h1>
      <ul>
        {tags.map((tag) => (
          <li key={tag.id}>
            <Link href={`/tags/${tag.slug}`}>{tag.name}</Link>
          </li>
        ))}
      </ul>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async (_context) => {
  const tags = await getTags()

  if (!tags) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      tags
    }
  }
}
