// eslint-disable-next-line
import React from "react";

class AddNewTask extends React.Component {
    constructor(props) {
        super(props);

        this.inputFieldRefs = new React.createRef();
        this.state = {
            level: 1,
            name: ""
        }
    }

    componentDidMount() {
        this.inputFieldRefs.current.focus();
    }

    setLevel = level => {
        this.setState({
            level: level
        });
    }

    setName = event => {
        this.setState({
            name: event.target.value
        });
    }

    createNewTask = event => {
        event.preventDefault();
        if(this.state.name !== "") {
            const newTask = {
                name: this.state.name,
                level: this.state.level
            };
            this.setState({
                level: 1,
                name: ""
            });
            this.props.pushTask(newTask);
        }
    }

    render() {
        return (
            <div className="col-12">
                <form onSubmit={this.createNewTask}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">New task</label>
                        <input type="text" className="form-control" id="newTask" 
                        placeholder="New task" ref={this.inputFieldRefs}
                        onChange={this.setName}
                        value={this.state.name}/>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" 
                        name="level" checked={this.state.level === 2}
                        onChange={this.setLevel.bind(this, 2)}/>
                        <label className="form-check-label">
                            High
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" 
                        name="level" checked={this.state.level === 1}
                        onChange={this.setLevel.bind(this, 1)}/>
                        <label className="form-check-label">
                            Medium
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" 
                        name="level" checked={this.state.level === 0}
                        onChange={this.setLevel.bind(this, 0)}/>
                        <label className="form-check-label">
                            Low
                        </label>
                    </div>
                    <br/>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default AddNewTask;