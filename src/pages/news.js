import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Layout from '../components/Layout'
import NewsBox from '../components/NewsBox'

const News = () => {
  const { allMdx: { edges: data } } = useStaticQuery( graphql`
  query GetNewsBoxes {
    allMdx(filter: {
      fileAbsolutePath: {regex: "/news/"}},
      sort: {order: DESC, fields: frontmatter___date}) 
      {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMM DD, YYYY")
          }
          excerpt(pruneLength: 300)
        }
      }
    }
  }
  ` )

  return (
    <Layout title="News">

      {data.map( (
        { node: {
          fields: { slug },
          frontmatter: { title, date },
          excerpt,
        } },
      ) => (
        <NewsBox
          key={slug}
          url={slug}
          title={title}
          date={date}
          excerpt={excerpt}
          mb="1.2rem"
        />
      ) )}

    </Layout>
  )
}

export default News
