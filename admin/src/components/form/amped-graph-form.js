import componentMap from 'constants/form-component-map';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AmpedForm } from 'amped-react-form-builder';
import { Button } from 'react-md';
import {Loader, PageActions, Paper} from 'components/common';
import { toastSuccess } from 'libs/toasts';
import { cleanApiInput } from 'libs/api';
import {useMutation, useQuery} from '@apollo/react-hooks';

const getQueryData = (data) => {
  if (!data) {
    return {};
  }
  const keys = Object.keys(data);
  return data[keys[0]];
}

const AmpedGraphForm = ({
  apolloProps = {},
  dataQuery = null,
  dataQueryVariables = {},
  displayButton = false,
  displayToast = true,
  isCreating = false,
  itemName = '',
  updateQuery = null,
  updateQueryVariables = {},
  onComplete = () => {},
  onSubmit = () => {},
  ...rest
}) => {

  if (!dataQuery || !updateQuery) {
    throw new Error('dataQuery and updateQuery are required')
  }

  const history = useHistory();
  const [formValues, setFormValues] = useState(null)
  const { loading: queryLoading, data: values} = useQuery(dataQuery, {
    variables: dataQueryVariables,
    fetchPolicy: 'no-cache'
  });
  const [saveData, { data: responseData }] = useMutation(updateQuery, updateQueryVariables);

  if (isCreating && responseData) {
    const id = getQueryData(responseData).id;
    history.replace(`/venue/${id}`)
  }

  const handleSubmit = async () => {
    await saveData({
      variables: {
        input: cleanApiInput({
          ...getQueryData(values),
          ...formValues,
        }),
        ...updateQueryVariables
      }
    });

    toastSuccess(`${itemName} ${isCreating ? 'created' : 'updated'}`)
  }

  const handleChange = (name, value) => {
    const newValues = {
      ...getQueryData(values),
      ...formValues,
      [name]: value
    }

    console.log('NEW VALUES', newValues);

    setFormValues(newValues);
  }

  const isExisting = values;
  const data = formValues || getQueryData(values)
  const title = isExisting ? data && data.name : 'Create new venue';
  const subTitle = isExisting ? 'You are editing this venue' : 'Add a new venue to your account'
  const saveButtonLabel = isExisting ? 'Save' : 'Create';

  return (
    <div className="amped-graph-query">
      <Loader visible={queryLoading} />
      { !queryLoading && (
        <div className="amped-graph-query__container">
          <PageActions
            Actions={() => [
              <Button
                key="save-btn"
                theme="primary"
                themeType="contained"
                onClick={handleSubmit}
              >
                { saveButtonLabel }
              </Button>
            ]}
            subTitle={subTitle}
            title={title}
          />

          <Paper>
            <AmpedForm
              ButtonComponent={(props) => displayButton ? <Button/> : null}
              formValues={data}
              componentMap={componentMap}
              {...rest}
              onChange={handleChange}
              onSubmit={onSubmit || handleSubmit}
            />
          </Paper>
        </div>
      )}
    </div>
  );
};

AmpedGraphForm.propTypes = {
  apolloProps: PropTypes.object,
  dataQuery: PropTypes.object,
  dataQueryVariables: PropTypes.shape(),
  displayButton: PropTypes.bool,
  displayToast: PropTypes.bool,
  isCreating: PropTypes.bool,
  itemName: PropTypes.string,
  updateQuery: PropTypes.object,
  updateQueryVariables: PropTypes.shape(),
  onComplete: PropTypes.func,
  onSubmit: PropTypes.func,
}

export default AmpedGraphForm;

