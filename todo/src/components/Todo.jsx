import React from "react";
import classNames from "classnames";
import AddNewTask from "./AddNewTask";

function setColor(task) {
    return classNames("list-group-item", {
        "list-group-item-warning": task.level === 1,
        "list-group-item-success": task.level === 0,
        "list-group-item-danger": task.level === 2,
    });
}

class ToDo extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            tasks: [],
        };
    }

    componentDidMount() {
        this.addTasksToState();
    }

    addTasksToState() {
        fetch("/todo")
            .then(res => res.json())
            .then(tasks => {
                this.setState({
                    tasks: tasks.sort((task1, task2) => {
                        return task1.level < task2.level ? 1 : -1;
                    }),
                })
            });
    }

    pushTask = task => {
        fetch("/todo/new", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({task: task}),
        }).then(res => res.json())
        .then(data => {
            if(data === null) {
                this.addTasksToState();
            }
        });
    }

    removeTask = task => {
        fetch(`/todo/delete/${task.id}`, {
            method: "DELETE", 
        }).then(res => res.json())
        .then(data => {
            if(data === null) {
                this.addTasksToState();
            }
        });
    }

    render() {
        return (
            <div className="col-12">
                <div className="row">
                <div className="col-6">
                    <ul className="list-group">
                        <li className="list-group-item active">ToDo list</li>
                        { this.state.tasks.map(task => 
                        <li key={task.id} className={setColor(task)}>
                            <div className="row">
                                <div className="col-10">
                                    { task.name }
                                </div>
                                <div className="col-2">
                                    <button className="btn btn-success" onClick={this.removeTask.bind(this, task)}>Done</button>
                                </div>
                            </div>               
                        </li>)}
                    </ul>
                </div>
                <div className="col-6">
                    <AddNewTask pushTask={this.pushTask} />
                </div>
                </div>
            </div>
        )
    }
}

export default ToDo;