import React from 'react';
import { default as SanitizedHTMLComponent } from 'react-sanitized-html';

const sanitizeAllowedAttributes = {
  a : [ 'href' ]
};

const sanitizeAllowedTags = [
  'a',
  'br',
  'b',
  'i'
]

const SanitizeHTML = ({
  html,
  allowedAttributes = sanitizeAllowedAttributes,
  allowedTags = sanitizeAllowedTags,
}) => (
  <SanitizedHTMLComponent
    allowedAttributes={allowedAttributes}
    allowedTags={allowedTags}
    html={html}
  />
)

export default SanitizeHTML;
