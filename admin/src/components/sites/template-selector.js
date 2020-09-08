import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import {Select} from "@react-md/form";

const GET_TEMPLATES = gql`
    query {
        getActiveSiteTemplate {
            name
            label
            dataForm
        }
    }
`

const TemplateSelector = ({
  onTemplateSelect,
  value,
}) => {
  const { data, loading } = useQuery(GET_TEMPLATES)

  const handleChange = (value) => {
    const template = data.getActiveSiteTemplate.find(({ name }) => name === value );
    let dataForm = null;

    try {
      dataForm = JSON.parse(template.dataForm);
    } catch(e) {}

    onTemplateSelect({
      name: template.name,
      dataForm,
    });
  }

  useEffect(() => {
    if (value && data) {
      handleChange(value);
    }
  }, [data])

  if (loading || !data.getActiveSiteTemplate) {
    return null;
  }

  const options = data.getActiveSiteTemplate.map(({ dataForm, name, label }) => ({
    label,
    value: name,
  }));

  return (
    <div className="site-template-selector">
      <Select
        id="template-selector"
        options={options}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default TemplateSelector;
