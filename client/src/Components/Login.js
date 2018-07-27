import React, { Component } from 'react';
import { AUTH_TOKEN } from '../constants';

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
            <div>
                <h4>{Login ? 'Login' : 'Sign Up'}</h4>
                <div>
                    {!login && (
                        <input
                            value={username}
                            onChange = {e => this.setState({username: e.target.value})}
                            type='text'
                            placeholder='Email'
                        />)}
                        <input
                            value={email}
                            onChange = {e => this.setState({email: e.target.value})}
                            type='text'
                            placeholder='email'
                        />
                        <input
                            value={password}
                            onChange = {e => this.setState({password: e.target.value})}
                            type='password'
                            placeholder='password'
                        />
                    )}
                </div>
                <div>
                    <div onClick = {() => this._confirm()}>
                        {Login ? 'Login' : 'Create Account'}
                    </div>
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
    _confirm = async () => {

    }

    _saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token)
    }
}