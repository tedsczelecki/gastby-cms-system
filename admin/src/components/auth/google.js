import qs from 'querystring';
import React, { PureComponent } from 'react';
import { withApollo } from 'react-apollo';
import { AUTH_GOOGLE } from 'queries/auth';
import { setUserToken } from 'services/storage';

class GoogleAuth extends PureComponent {

  async componentDidMount() {
    try {
      const { code } = qs.parse(this.props.location.search.substring(1));
      const { data } = await this.props.client.mutate({
        mutation: AUTH_GOOGLE,
        variables: {
          code
        }
      });

      if (data) {
        setUserToken(data.registerGoogle.token);
        window.opener.location.href = '/';
        window.close();
        return;
      }
    } catch(e) {
      console.log('Google auth error', e);
    }
  }

  render() {
    return (
      <div>Loading user</div>
    )
  }
}

export default withApollo(GoogleAuth);
