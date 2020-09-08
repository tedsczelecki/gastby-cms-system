import React from 'react';

const Homepage = ({
  pageContext
}) => {
  console.log('PAGE CONTEXT HOMEPAGE', pageContext);
  return (
    <div>
      HOMEPAGE???
      <h1>{pageContext.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: pageContext.content}} />
    </div>
  );
};

export const dataForm = {
  "fields": [
    [
      {
        "label": "Tagline",
        "name": "tagline",
        "type": "text"
      }
    ]
  ]
}

export default Homepage;
