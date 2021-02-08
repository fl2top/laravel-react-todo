import React from 'react';
import TodoElement from "./TodoElement";

class TodoList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newTaskValue: '',
            tasksList: [],
            isNewTaskButtonDisabled: false,
        };

        this.updateNewTaskValue = this.updateNewTaskValue.bind(this);
        this.addNewTask = this.addNewTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    updateNewTaskValue(event) {
        this.setState({newTaskValue: event.target.value});
    }

    addNewTask(event) {
        event.preventDefault();
        this.setState({isNewTaskButtonDisabled: true});

        window.axios.post('/api/tasks/create', {'body': this.state.newTaskValue})
            .then(response => {
                if (response.status === 200 && response.data.body) {
                    this.setState({newTaskValue: ''});
                    let taskList = this.state.tasksList;
                    taskList.push(response.data);
                    this.setState({tasksList: taskList});
                }
            })
            .catch(error => {
                if (error.response.data && error.response.data.errors && error.response.data.message) {
                    alert(error.response.data.message + ' ' + error.response.data.errors.body.join(','))
                }
            })
            .finally(() => {
                this.setState({isNewTaskButtonDisabled: false});
            });
    }

    deleteTask(taskId) {
        window.axios.delete('/api/tasks/delete/' + taskId)
            .then(response => {
                if (response.status === 200 && response.data.id) {
                    let filteredTasks = this.state.tasksList.filter(item => {
                        return item.id !== response.data.id;
                    });

                    this.setState({tasksList: filteredTasks});
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
        window.axios.get('/api/tasks/all', ).then(res => {
            this.setState({tasksList: res.data});
        });
    }

    render() {
        return (
            <div className="content">
                <div className="d-flex justify-content-center">
                    <form className="row" onSubmit={this.addNewTask}>
                        <div className="col-auto">
                            <input type="text" className="form-control" onChange={this.updateNewTaskValue} value={this.state.newTaskValue} id="new-task-text-field" placeholder="New task"/>
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-outline-primary mb-3" disabled={this.state.isNewTaskButtonDisabled}>Add new task</button>
                        </div>
                    </form>
                </div>

                <ul className="list-group list-group-flush">
                    {this.state.tasksList.map(function (item) {
                        return <TodoElement value={item.body} key={item.id} taskId={item.id} onElementDelete={this.deleteTask}/>
                    }, this)}
                </ul>
            </div>
        )
    }
}

export default TodoList;
