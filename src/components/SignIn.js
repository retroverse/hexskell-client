import React from 'react'
import { GoogleLogin } from 'react-google-login'

import { GOOGLE_CLIENT_ID, BACK_END_AUTH_ADDRESS } from '../config'
import { useApolloClient } from '@apollo/react-hooks'
import propTypes from 'prop-types'

const handleGoogleResponse = (response, client, callback) => {
  // Get token from response
  const token = response.Zi.id_token
  if (!token) {
    throw Error('Google response didnt include id token')
  }

  // Send it to backend
  window.fetch(`${BACK_END_AUTH_ADDRESS}/login?token=${token}`, {
    method: 'POST',
    credentials: 'include'
  })
    .then(response => response.json())
    .then(data => {
      client.resetStore()
      callback(data)
    })
}

const handleGoogleFailure = error => {
  throw error
}

const SignIn = ({ callback }) => {
  const client = useApolloClient()

  return (<GoogleLogin
    clientId={GOOGLE_CLIENT_ID}
    buttonText="Login"
    cookiePolicy={'single_host_origin'}
    onSuccess={response => handleGoogleResponse(response, client, callback)}
    onFailure={handleGoogleFailure}
  />)
}

SignIn.propTypes = { callback: propTypes.func }

export default SignIn
