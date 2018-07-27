import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import Expenses from './Expenses';
import Form from './Form';

/**
 * Queries database for expenses
 * parses query 
 */
const ExpenseQuery = gql`
    {
    expenses {
        type
        name
        amount
    }
    }
    `;

/**
 * Sets GraphQL syntax to add expense to DB
 */
const createExpenseMutation = gql`
    mutation($type: String!, $name: String!, $amount: String!){
        createExpense(type: $type, name: $name, amount: $amount) {
            id
            type
            name
            amount
        }
    }
`



class XpenseTracker extends Component {

  createExpense = async state => {
    await this.props.createExpense({
        variables: {
            state,
        },
        update: (store, {data: { createExpense } }) => {
            //reads what is cached in db
            const data = store.readQuery({ query: ExpenseQuery });
            //adds expense to db
            data.expenses.push(createExpense);
            //writes data back to cache
            store.writeQuery({ query: ExpenseQuery, data})
        }
    })
  }

  render() {
        /**
         * sets data in db as props
         */
        const {data: {loading, expenses}} = this.props;
        if(loading) {
        return null
        }

        return (
            <div> 
                <Form submit={this.createExpense} />
                {expenses.map(expense => {
                    return <Expenses expense={expense} key={`${expense.id}-expense-item`}  />
                })}
            </div>
        )
    }
}


export default compose(
    graphql(createExpenseMutation, {name: "createExpense"}), 
    graphql(ExpenseQuery)
)(XpenseTracker);