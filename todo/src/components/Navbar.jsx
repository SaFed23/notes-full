import React from "react";
import Clock from "./Clock";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDisplay: false,
            countOfTasks: 0,
            countOfNotes: 0,
            countOfNotesAtToday: 0,
        }
    }

    changeState = () => {
        fetch("/info/length").then(res => res.json())
            .then(data => {            
                if(data.todo.err === null && data.notes.err === null){
                        this.setState({
                            countOfTasks: data.todo.arr.length,
                            countOfNotes: data.notes.arr.length,
                            isDisplay: !this.state.isDisplay,
                        });
                } 
            });
    }

    render() {
        return (
            <div className="col-12">
                <nav className="navbar navbar-dark bg-primary" 
                style={{ display: this.state.isDisplay ? "block": "None" }}>
                    <div className="row">
                    <div className="col-1">
                    <Link to="/" className="navbar-brand">Home</Link>
                    </div>
                    <div className="col-6">
                    <ul className="list-group list-group-horizontal">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <Link to="/todo" style={{ textDecoration: 'none' }}>
                                ToDo list
                            </Link>
                            <span className="badge badge-primary badge-pill">
                                {this.state.countOfTasks || ""}
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <Link to="/notes" style={{ textDecoration: 'none' }}>
                                Notes
                            </Link>
                            <span className="badge badge-primary badge-pill">
                                {this.state.countOfNotes || ""}
                            </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <Link to="/calendar" style={{ textDecoration: 'none' }}>
                                Calendar
                            </Link>
                            <span className="badge badge-primary badge-pill">1</span>
                        </li>
                    </ul>
                    </div>
                    </div>
                </nav>
                <Clock changeState={this.changeState} isDisplay={this.state.isDisplay}/>
            </div>
        )
    }
}

export default Navbar;