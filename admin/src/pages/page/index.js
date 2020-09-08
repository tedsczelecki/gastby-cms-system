import React, {useState} from 'react';
import { AmpedGraphForm } from 'components/form';
import { useRouteMatch } from 'react-router-dom';
import { pageForm, pageMetaForm } from 'constants/forms';
import gql from 'graphql-tag';
import {PageActions, Paper} from "../../components/common";
import {Button} from "react-md";
import {AmpedForm} from "amped-react-form-builder";
import componentMap from "../../constants/form-component-map";
import { TemplateSelector } from 'components/sites';
import {useMutation, useQuery} from "@apollo/client";
import {cleanApiInput} from "../../libs/api";
import {toastSuccess} from "../../libs/toasts";
import { getFormattedSlug } from 'libs/formatters';
import { useMe } from 'hooks';
import { Select } from '@react-md/form';

import './page-create.scss';

export const PAGE = gql`
  query GetPage($id: Int!) {
    getPage(id: $id) {
      title
      content
      status
      url
      template
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
`;

export const UPDATE_PAGE = gql`
    mutation UpdatePage($id: Int!, $input: PageInput!) {
        updatePage(id: $id, input: $input) {
            id
        }
    }
`;

export const CREATE_PAGE = gql`
    mutation CreatePage($input: PageInput!) {
        createPage(input: $input) {
            id
        }
    }
`;

const statusOptions = [
  {
    label: 'Draft',
    value: 'draft',
  },
  {
    label: 'Hidden',
    value: 'hidden',
  },
  {
    label: 'Live',
    value: 'live',
  },
];

const formatDataObject = (...args) => {
  const formattedObject = args.reduce((acc, arg) => {
    if (Array.isArray(arg)) {
      return arg.reduce((argAcc, {key, value}) => {
        argAcc[key] = value;
        return argAcc;
      }, acc);
    }
    return acc;
  }, {});

  return formattedObject
}

const objectToKeyValue = (obj) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    acc.push({ key, value });
    return acc
  }, []);
}

const VenuePage = () => {
  const { me } = useMe();
  const match = useRouteMatch();
  const isCreating = !match.params.id
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [dataFormData, setDataFormData] = useState(null);
  const [formValues, setFormValues] = useState({})

  const updateQuery = isCreating ? CREATE_PAGE : UPDATE_PAGE;
  const dataQueryVariables = isCreating ? {} : {
    id: parseInt(match.params.id)
  }


  const { loading: queryLoading, data: values} = useQuery(PAGE, {
    variables: dataQueryVariables,
    fetchPolicy: 'no-cache'
  });

  const existingValues = values && values.getPage || {};
  const [saveData, { data: responseData }] = useMutation(updateQuery);

  const handleSubmit = async () => {

    console.log('EXI', existingValues, 'form', formValues);
    const input = cleanApiInput({
      ...existingValues,
      ...formValues,
      data: {
        ...formatDataObject(existingValues.data, formValues.data),
      }
    });

    console.log('INPUT', input);

    if (input.data) {
      input.data = objectToKeyValue(input.data);
    }

    await saveData({
      variables: {
        ...dataQueryVariables,
        input,
      }
    });
    await fetch(`${me.activeSite.previewUrl}/__refresh`, {
      method: 'post',
    });
    setIsFormDirty(false);


    toastSuccess(`Page ${isCreating ? 'created' : 'updated'}`)
  }

  const handleContentChange = (name, value) => {
    const extraData = {};

    if (name === 'title') {
      extraData.url = `/${getFormattedSlug(value)}`;
    }

    const newValues = {
      ...existingValues,
      ...formValues,
      [name]: value,
      ...extraData
    }
    // setIsFormDirty(true);
    setFormValues(newValues);
  }

  const handleMetaChange = (name, value) => {
    const newValues = {
      ...existingValues,
      ...formValues,
      meta: {
        ...(existingValues.meta || {}),
        ...(formValues.meta || {}),
        [name]: value,
      },
    }
    // setIsFormDirty(true);
    setFormValues(newValues);
  }

  const handleDataChange = (name, value) => {
    const newValues = {
      ...existingValues,
      ...formValues,
      data: {
        ...formatDataObject(existingValues.data, formValues.data),
        [name]: value,
      },
    }
    // setIsFormDirty(true);
    setFormValues(newValues);
  }

  const handlePreviewClick = async () => {
    const values = {
      ...existingValues,
      ...formValues,
    };
    const { previewUrl } = me.activeSite;
    window.open(`${previewUrl}${values.url}`);
  }

  const handleTemplateChange = ({ name, dataForm }) => {
    handleContentChange('template', name);
    setDataFormData(dataForm);
  }

  if (queryLoading) {
    return null;
  }

  const data = {
    ...existingValues,
    ...formValues,
  };

  if (Array.isArray(data.data)) {
    data.data = formatDataObject(data.data)
  }

  const title = isCreating ? `Create new page` : data.title;
  const subTitle = isCreating ? 'You are editing this page' : 'You are creating a page';
  const saveButtonLabel = isCreating ? 'Create' : 'Save';

  return (
      <div className="page-create">
        <PageActions
          Actions={() => [
            <div className="page-create__actions">
              <Button
                disabled={isFormDirty}
                key="preview-btn"
                theme="primary"
                themeType="clear"
                onClick={handlePreviewClick}
              >
                Preview
              </Button>
              <Button
                key="save-btn"
                theme="primary"
                themeType="contained"
                onClick={handleSubmit}
              >
                { saveButtonLabel }
              </Button>
            </div>
          ]}
          subTitle={subTitle}
          title={title}
        />

        <div className="page-create__content">
          <div className="page-create__main">
            <Paper title='Page Content'>
              <AmpedForm
                ButtonComponent={null}
                formValues={data}
                formData={pageForm}
                componentMap={componentMap}
                onChange={handleContentChange}
              />
            </Paper>
            <Paper title='Page Meta'>
              <AmpedForm
                ButtonComponent={null}
                formValues={data.meta}
                formData={pageMetaForm}
                componentMap={componentMap}
                onChange={handleMetaChange}
              />
            </Paper>
            {dataFormData && (
              <Paper title='Page Data'>
                <AmpedForm
                  ButtonComponent={null}
                  formValues={data.data}
                  formData={dataFormData}
                  componentMap={componentMap}
                  onChange={handleDataChange}
                />
              </Paper>
            )}
          </div>

          <div className="page-create__sidebar">
            <Paper title="Status">
              <div className="page-create__status-selector">
                <Select
                  id="status-selector"
                  options={statusOptions}
                  value={data.status || 'live'}
                  onChange={(val) => handleContentChange('status', val) }
                />
              </div>
            </Paper>

            <Paper title="Template">
              <div className="page-create__status-selector">
                <TemplateSelector value={data.template} onTemplateSelect={handleTemplateChange } />
              </div>
            </Paper>
          </div>
        </div>
      </div>
  );
};

export default VenuePage;





