import React from "react";
import ReactCalendar from "react-calendar";

class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: [],
            currentDate: new Date(),
        }
    }

    componentDidMount() {
        fetch("/notes").then(res => res.json())
            .then(data => console.log(data));
        this.setState({
            currentDate: new Date(),
        })
    }

    render() {
        return (
            <div className="col-12">
                <br/><br/>
                <div className="row">
                    <div className="col-8"></div>
                    <div className="col-4"><ReactCalendar/></div>
                </div>
            </div>
        )
    }
}

export default Calendar;