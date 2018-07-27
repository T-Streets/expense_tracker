import React, { Component } from 'react';

export default class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: '',
            name: '',
            amount: ''
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.submit(this.state)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.submit}>
                    Type<input onChange={this.handleChnage} name='type' />
                    Name<input onChange={this.handleChnage} name ='name' />
                    Amount<input onChange={this.handleChnage} name='amount' />
                </form>
                <button>Submit</button>
            </div>
        )
    }
}