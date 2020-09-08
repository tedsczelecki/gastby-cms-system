import React from 'react';
import { AmpedGraphForm } from 'components/form';
import { useRouteMatch } from 'react-router-dom';
import { siteForm } from 'constants/forms';
import gql from 'graphql-tag';

export const SITE = gql`
  query GetSite($id: Int!) {
    getSite(id: $id) {
        id
        name
        status
        url
    }
  }
`;

export const UPDATE_SITE = gql`
    mutation UpdateSite($id: Int!, $input: SiteInput!) {
        updateSite(id: $id, input: $input) {
            id
        }
    }
`;

export const CREATE_SITE = gql`
    mutation CreateSite($input: SiteInput!) {
        createSite(input: $input) {
            id
        }
    }
`;

const SitePage = () => {
  const match = useRouteMatch();
  const isCreating = !match.params.id

  const updateQuery = isCreating ? CREATE_SITE : UPDATE_SITE;
  const dataQueryVariables = isCreating ? {} : {
    id: parseInt(match.params.id)
  }

  return (
      <AmpedGraphForm
        basePath="/site"
        dataQuery={SITE}
        dataQueryVariables={dataQueryVariables}
        formData={siteForm}
        isCreating={isCreating}
        itemName="Site"
        updateQuery={updateQuery}
        updateQueryVariables={dataQueryVariables}
      />
  );
};

export default SitePage;

