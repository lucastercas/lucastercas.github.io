module.exports = {
  siteMetadata: {
    title: `Random Internet Blog`,
    description: `Blog where I write about things that interest me,
    and also about thing that I use frequently but forget, so I need a place
    to document it.`,
    siteUrl: `https://lucastercas.github.io/`,
    author: `lucasmtercas`,
    social: {
      twitter: `lucastercas`,
    },
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
      options: {
        name: "posts",
        path: `${__dirname}/src/content/posts`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Personal Blog`,
        short_name: `blog`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/site_icon.jpg`,
      },
    },
    `gatsby-plugin-offline`,
  ],
}
