import React from "react";
import ToDo from "./Todo";
import Navbar from "./Navbar";
import Notes from "./Notes";
import Calendar from "./Calendar";
import {Switch, Route} from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                <Navbar />
                <Switch>
                    <Route exact path='/todo'>
                        <ToDo/>
                    </Route>
                    <Route path='/notes'>
                        <Notes/>
                    </Route>
                    <Route path='/calendar'>
                        <Calendar/>
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default App;