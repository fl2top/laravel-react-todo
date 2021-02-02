import React from 'react';
import TodoElement from "./TodoElement";

class TodoList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newTaskValue: '',
            tasksList: []
        };

        this.updateNewTaskValue = this.updateNewTaskValue.bind(this);
        this.addNewTask = this.addNewTask.bind(this);
    }

    updateNewTaskValue(event) {
        this.setState({newTaskValue: event.target.value});
    }

    addNewTask(event) {
        event.preventDefault();

        window.axios.post('/api/create', {'body': this.state.newTaskValue})
        .then(response => {
            if (response.status === 200 && response.data.body) {
                alert('Record successfully created!');
                this.setState({newTaskValue: ''});
                document.getElementById('new-task-text-field').value = '';

                let taskList = this.state.tasksList;
                taskList.push(response.data);
                this.setState({tasksList: taskList});
            }
        })
        .catch(error => {
            if (error.response.data && error.response.data.errors && error.response.data.message) {
                alert(error.response.data.message + ' ' + error.response.data.errors.body.join(','))
            }
        });
    }

    componentDidMount() {
       this.fetchAllTasks();
    }

    fetchAllTasks() {
        window.axios.get('/api/all', ).then(res => {
            this.setState({tasksList: res.data});
        });
    }

    render() {
        return (
            <div className="content">
                <div className="d-flex justify-content-center">
                    <form className="row" onSubmit={this.addNewTask}>
                        <div className="col-auto">
                            <input type="text" className="form-control" onChange={this.updateNewTaskValue} id="new-task-text-field" placeholder="New task"/>
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-outline-primary mb-3">Add new task</button>
                        </div>
                    </form>
                </div>

                <ul className="list-group list-group-flush">
                    {this.state.tasksList.map(function (item) {
                        return <TodoElement value={item.body} key={item.id}/>
                    })}
                </ul>
            </div>
        )
    }
}

export default TodoList;
