import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/Bio"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import PostFrontmatter from "../components/PostFrontmatter"
import PostFrontmatterTIL from "../components/PostFrontmatterTIL"
import PostTableOfContent from "../components/PostTableOfContent"
import { Utterances } from '../components/PostComment'
import { rhythm } from "../utils/typography"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article itemScope itemType="http://schema.org/Article">
        <header>
          <h1
            itemProp="headline"
            style={{
              marginTop: rhythm(2),
              marginBottom: 0,
            }}
          >
            {post.frontmatter.title}
          </h1>
          {
            post.frontmatter.category === 'report'
              ? <PostFrontmatterTIL
                date={post.frontmatter.date}
                timeToRead={post.timeToRead}
                category={post.frontmatter.category}
                isInPost={true}
                creator={post.frontmatter.creator}
                created_at={post.frontmatter.created_at}
                link={post.frontmatter.link}
              />
              : <PostFrontmatter
                date={post.frontmatter.date}
                timeToRead={post.timeToRead}
                category={post.frontmatter.category}
                isInPost={true}
              />
          }
        </header>
        <PostTableOfContent tableOfContents={post.tableOfContents} />
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr style={{ marginBottom: rhythm(1) }} />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <Utterances />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      tableOfContents
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        category
        creator
        created_at
        link
      }
    }
  }
`
