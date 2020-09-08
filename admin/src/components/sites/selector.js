import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMe } from 'hooks';
import { useQuery, useMutation } from '@apollo/client';
import { Select } from '@react-md/form';

const GET_SITES = gql`
  query {
    mySites {
      id,
      name
    }
  }
`

const SET_ACTIVE_SITE = gql`
    mutation SetMyActiveSite($siteId: Int!) {
        setMyActiveSite(siteId: $siteId) {
            success
        }
    }
`

const handleGetOptionValue = ({ value }) => value

const SiteSelector = () => {
  const { me } = useMe();
  const { data, loading } = useQuery(GET_SITES);
  const [setActiveSite] = useMutation(SET_ACTIVE_SITE);
  const [value, setValue] = useState(null);

  if (loading || !me) {
    return null;
  }

  const handleChange = async (val) => {
    setValue(val);

    await setActiveSite({
      variables: {
        siteId: parseInt(val, 10),
      }
    })
  }

  const options = data.mySites.map(({ id, name }) => ({
    label: name,
    value: id,
  }));

  const _value = value || me.activeSite.id

  return (
    <div className="site-selector">
      <Select
        id="site-selector"
        label="Editing site"
        options={options}
        value={_value}
        placeholder="Set active site"
        getOptionValue={handleGetOptionValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default SiteSelector;
