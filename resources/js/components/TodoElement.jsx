import React from 'react';

class TodoElement extends React.Component {
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
       this.props.onElementDelete(this.props.taskId);
    }

    /**
     * TODO Use 2 components here
     * The first one - read only text plus edit button
     * The second one - Form for changes
     * @returns {*}
     */
    render() {
        return (
            <li className='list-group-item'>
                <span className='read-only-value'>{this.props.value}</span>
                <button onClick={this.editTask} type="button" className="btn bi-pencil">
                </button>
                <button onClick={this.handleDelete} type="button" className="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </li>
        )
    };
}

export default TodoElement;
