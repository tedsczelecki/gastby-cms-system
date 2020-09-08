import React, { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { ContentState, EditorState, convertToRaw, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './textarea.scss';
const Textarea = ({
  label,
  value,
  onChange,
  ...rest
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleChange = (newEditorState) => {
    const rawContentState = convertToRaw(newEditorState.getCurrentContent());
    const markup = draftToHtml(rawContentState);
    onChange(markup);
    setEditorState(newEditorState);
  }

  useEffect(() => {
    const blocksFromHTML = convertFromHTML(value || '');
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    );
    setEditorState(EditorState.createWithContent(state));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="rp-textarea">
      <div className="rp-textarea__label">
        {label}
      </div>
      <Editor
        {...rest}
        editorState={editorState}
        onEditorStateChange={handleChange}
      />
    </div>
  );
};

export default Textarea;
