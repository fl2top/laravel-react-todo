import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from "./TodoList";

export default class App extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">My ToDo List</div>
                            <div className="card-body">
                                <TodoList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

if (document.getElementById('main')) {
    ReactDOM.render(<App/>, document.getElementById('main'));
}
