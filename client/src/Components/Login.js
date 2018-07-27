import React, { Component } from 'react';
import { AUTH_TOKEN } from './constants';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const SignUpMutation =gql`
    mutation SignUpMutation($email: String!, $password: String!, $username: String!) {
        signup(email: $email, password: $password, username: $username) {
            token
        }
    }
`
const LoginMutation = gql`
    mutation LoginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
        }
    }
`


export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login: true,
            email: '',
            password: '',
            username: ''
        }
    }
    render() {
        const { login, email, password, username } = this.state
        return (
            /**
             * If user has account, then only email and password input will be present
             * otherwise user will be prompted for username
             */
            <div>
                <h4>{Login ? 'Login' : 'Sign Up'}</h4>
                <div>
                    {!login && (
                        <input
                            value={username}
                            onChange = {e => this.setState({username: e.target.value})}
                            type='text'
                            placeholder='Username'
                        />)}
                        <input
                            value={email}
                            onChange = {e => this.setState({email: e.target.value})}
                            type='text'
                            placeholder='Email'
                        />
                        <input
                            value={password}
                            onChange = {e => this.setState({password: e.target.value})}
                            type='password'
                            placeholder='Password'
                        />
                    
                </div>
                <div>
                    <Mutation 
                        mutation={login ? LoginMutation : SignUpMutation}
                        variables={{ email, password, username }}
                        onCompleted={data => this._confirm(data)}
                    >
                        {mutation => (
                            <div onClick={mutation}>{Login ? 'login' : 'create account'}</div>
                        )}
                    </Mutation>
                    <div onClick = {() => this.setState({login: !login})}>
                        {Login
                        ? 'Create Account'
                        : 'Already have an account?'
                        }
                    </div>
                </div>
            </div>
        )
    }

    /**
     * Implement Mutations 
     */
    _confirm = async data => {
        const { token } = this.state.login ? data.login : data.signup
        this._saveUserData(token)
        this.props.history.push(`/`)
    }

    _saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token)
    }
}