import React, { PureComponent } from 'react';

export default class Expenses extends PureComponent {
    onClickHandler = () => {
        this.props.onClick(this.props.expense.id)
    }

    render() {
        return (
            <ul>
                {this.props.expense.type} - "{this.props.expense.name}" - ${this.props.expense.amount}
            </ul>
        )
    }
}