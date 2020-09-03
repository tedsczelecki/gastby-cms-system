import gql from 'graphql-tag';

export const ME = gql`
    query {
      me {
        email
        name
        role
      }
    }
`;

export const AUTH_URLS = gql`
    query {
        authUrls {
            googleUrl
        }
    }
`;

export const AUTH_GOOGLE = gql`
    mutation RegisterGoogle($code: String!) {
        registerGoogle(code: $code) {
            token
        }
    }
`

export const FORGOT_PASSWORD = gql`
    mutation ForgotPassword($email: String!) {
        forgotPassword(email: $email) {
            message
        }
    }
`

export const RESET_PASSWORD = gql`
    mutation ResetPassword($password: String!, $confirmPassword: String!, $token: String!) {
        resetPassword(password: $password, confirmPassword: $confirmPassword, token: $token) {
            success,
            message
        }
    }
`

export const LOGIN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
    }
  }
`;

export const REGISTER_USER = gql`
    mutation Register($name: String!, $email: String!, $password: String!) {
        register(name: $name, email: $email, password: $password) {
            token
        }
    }
`
