import { GetStaticProps } from 'next'
import Link from 'next/link'
import { getAuthors, Authors } from '@/cms'

import { Container } from '@/components/Container'

type AuthorsPageProps = {
  authors: Authors
}

export default function AuthorsPage({ authors }: AuthorsPageProps) {
  return (
    <Container>
      <h1>Posts</h1>
      <ul>
        {authors.map((author) => (
          <li key={author.id}>
            <Link href={`/authors/${author.slug}`}>{author.name}</Link>
          </li>
        ))}
      </ul>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const authors = await getAuthors()

  if (!authors) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      authors
    }
  }
}
