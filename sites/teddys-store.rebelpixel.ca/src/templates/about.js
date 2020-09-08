import React from 'react';

const About = ({
  pageContext
}) => {
  console.log('PAGE CONTEXT ABOUT', pageContext);
  return (
    <div>
      ABOUTT???
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
    ],
    [
      {
        "label": "Mission statement",
        "name": "mission-statement",
        "type": "textarea"
      }
    ]
  ]
}

export default About;
