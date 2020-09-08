/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const axios = require('axios');
const path = require('path');
const authHeaderValue = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2VJZCI6bnVsbCwiaWQiOjEsImVtYWlsIjoidGVkQHJlYmVscGl4ZWwuY2EiLCJyb2xlIjoidXNlciIsImlhdCI6MTU5OTE4MDA5NywiZXhwIjoxNjMwNzM3Njk3fQ.6j8fi6aJ8xiEVUV4NdAI18OzKg33epspuSxQiZ-iM34';

// You can delete this file if you're not using it
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const pages = await axios.post('http://localhost:8000/graphql', {
    query: `query {
      mySitePages {
        id
        parentId
        url
        title
        content
        template
        status
        meta {
          title
          description
          custom
        }
        data {
          key
          value
        }
      }
    }
    `,
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': authHeaderValue
    }
  });

  pages.data.data.mySitePages.forEach((page) => {
    const {
      data,
      template,
      url,
    } = page;

    const templateComponent = path.resolve(`src/templates/${template}.js`);
    createPage({
      path: url,
      component: templateComponent,
      context: {
        ...page,
        data: data.reduce((acc, { key, value}) => {
          acc[key] = value;
          return acc;
        }, {})
      }
    })
  })

  console.log();
}
