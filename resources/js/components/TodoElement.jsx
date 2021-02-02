import React from 'react';

class TodoElement extends React.Component {
    constructor(props) {
        super(props);
    }

    editTask(clickEvent) {
        let editButton = clickEvent.target;
        let currentListElement = editButton.parentNode;

        let readOnlyValue = currentListElement.querySelector('.read-only-value');
        if (readOnlyValue.style.display === 'none') {
            return true;
        }

        readOnlyValue.style.display = 'none';
        editButton.style.display = 'none';

        let formElement = document.createElement('div');

        formElement.innerHTML = '<form class="row" onSubmit={this.updateTasj}>\n' +
            '                        <div class="col-auto">\n' +
            '                            <input type="text" class="form-control" onChange={this.updateNewTaskValue}/>\n' +
            '                        </div>\n' +
            '                        <div class="col-auto">\n' +
            '                            <button type="submit" class="btn btn-outline-primary mb-3">Save changes</button>\n' +
            '                        </div>\n' +
            '                    </form>';

        currentListElement.insertAdjacentElement('afterbegin', formElement);
    }

    render() {
        return (
            <li className='list-group-item'>
                <span className='read-only-value'>{this.props.value}</span>
                <button onClick={this.editTask} type="button" className="btn bi-pencil">
                </button>
                <button type="button" className="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </li>
        )
    };
}

export default TodoElement;
