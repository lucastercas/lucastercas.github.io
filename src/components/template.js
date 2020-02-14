import React from "react"
import { graphql } from "gatsby"
import Layout from "./layout"
import SEO from "./seo"

export default function Template({ data }) {
  // console.log("Data:)", data)

  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description || ""}
      />
      <article>
        <header>
          <h1>{frontmatter.title}</h1>
          <p>{frontmatter.date}</p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: html }} />
        <hr />
      </article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    markdownRemark {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        description
      }
    }
  }
`
