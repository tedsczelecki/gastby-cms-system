import React from 'react';
import { AmpedGraphForm } from 'components/form';
import { useRouteMatch } from 'react-router-dom';
import { venueForm } from 'constants/forms';
import gql from 'graphql-tag';

export const VENUE = gql`
  query GetVenue($id: Int!) {
    getVenue(id: $id) {
      address
      name
      description
      logo {
        id
        url
      }
    }
  }
`;

export const UPDATE_VENUE = gql`
    mutation UpdateVenue($id: Int!, $input: VenueInput!) {
        updateVenue(id: $id, input: $input) {
            id
        }
    }
`;

export const CREATE_VENUE = gql`
    mutation CreateVenue($input: VenueInput!) {
        createVenue(input: $input) {
            id
        }
    }
`;

const VenuePage = () => {
  const match = useRouteMatch();
  const isCreating = !match.params.id

  const updateQuery = isCreating ? CREATE_VENUE : UPDATE_VENUE;
  const dataQueryVariables = isCreating ? {} : {
    id: parseInt(match.params.id)
  }

  return (
      <AmpedGraphForm
        dataQuery={VENUE}
        dataQueryVariables={dataQueryVariables}
        formData={venueForm}
        isCreating={isCreating}
        itemName="Venue"
        updateQuery={updateQuery}
        updateQueryVariables={dataQueryVariables}
      />
  );
};

export default VenuePage;

