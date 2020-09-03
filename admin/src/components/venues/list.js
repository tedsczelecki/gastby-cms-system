import gql from 'graphql-tag';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {useLazyQuery, useMutation} from "@apollo/react-hooks";
import { Button } from '@react-md/button';
import { EditSVGIcon, DeleteSVGIcon } from '@react-md/material-icons';
import { DialogButton } from 'components/common';
import { useHistory } from 'react-router-dom';

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@react-md/table";

import './venues-list.scss';

import {Loader, Paper} from 'components/common';

export const DELETE_VENUE = gql`
  mutation DeleteVenue($id: Int!) {
    deleteVenue(id: $id) {
      success
    }
  }
`;

export const MY_VENUES = gql`
  query{
    myVenues {
        id
        name
        address
    }
  }
`;

const tableColumns = [
  {
    name: 'name',
    label: 'Name',
    options: {
      filter: true,
      sort: true
    }
  },
  {
    name: 'address',
    label: 'Address',
    options: {
      filter: true,
      sort: true
    }
  },
];

const VenueList = () => {
  const history = useHistory();
  const [ getData, { loading, data = {} }] = useLazyQuery(MY_VENUES, {
    variables: { language: 'english' },
    fetchPolicy: 'no-cache'
  });
  const [doDeletion] = useMutation(DELETE_VENUE);

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    await doDeletion({
      variables: {
        id,
      }
    });

    getData();
  }

  const list = data.myVenues;

  return (
    <div>
      <Loader visible={loading} />
      { list && list.length > 0 ?
        (
          <Paper className="venues-page">
            <Table>
              <TableHeader>
                <TableRow>
                  { tableColumns.map(({
                    label, i
                  }) => <TableCell key={label}>{label}</TableCell>)}
                  <TableCell />
                </TableRow>
              </TableHeader>
              <TableBody>
                {list.map(({
                  address, id, name, zones
                }) => {
                  return (
                    <TableRow key={id} disableHover={false}>
                      <TableCell>
                        {name}
                      </TableCell>
                      <TableCell>
                        {address}
                      </TableCell>
                      <TableCell>
                      </TableCell>
                      <TableCell>
                        <div className="data-list__actions">
                          <Button
                            id={`edit-${id}`}
                            buttonType="icon"
                            theme="primary"
                            aria-label="Edit"
                            onClick={() => history.push(`/venue/${id}`) }
                          >
                            <EditSVGIcon />
                          </Button>

                          <DialogButton
                            confirmButtonLabel="Delete"
                            content={`Are you sure you want to delete ${name}`}
                            theme="error"
                            onConfirm={handleDelete.bind(this, id)}
                          >
                            <Button
                              id="icon-button-3"
                              buttonType="icon"
                              theme="warning"
                              aria-label="Move to Trash"
                            >
                              <DeleteSVGIcon />
                            </Button>
                          </DialogButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
      ) : (
        <div className="venues-page__no-results">No venues added. <Link to="/venue">Create one now!</Link></div>
        )}
    </div>
  )
}

export default VenueList;
