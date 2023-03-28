import { GetStaticProps, GetStaticPaths } from 'next'
import Image from 'next/image'
import { getAuthorBySlug, getAuthors, Author } from '@/cms'

import { Container } from '@/components/Container'

type AuthorPageProps = {
  author: Author
}

export default function AuthorPage({ author }: AuthorPageProps) {
  return (
    <Container>
      <article className="prose lg:prose-xl">
        {author.profile_image && (
          <Image
            src={author.profile_image}
            alt={author.slug}
            width={300}
            height={200}
            unoptimized
          />
        )}
        <h1>{author.name}</h1>
        <p>{author.bio}</p>
      </article>
    </Container>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const authors = await getAuthors()

  const paths =
    authors?.map((author) => ({
      params: { slug: author.slug }
    })) || []

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug

  if (!slug) {
    return {
      notFound: true
    }
  }

  const slugString = Array.isArray(slug) ? slug[0] : slug
  const author = await getAuthorBySlug(slugString)

  if (!author) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      author
    }
  }
}
