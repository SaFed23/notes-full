import React from "react";

class Clock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            time: (new Date()).toLocaleTimeString(),
        }
    }

    componentDidMount() {
        setInterval(this.thisTime, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.thisTime);
    }

    thisTime = () => {
        this.setState({
            time: (new Date()).toLocaleTimeString(),
        });
    }

    

    render() {       
        return (
            <div className="row">
                <div className="col-2">
                    <button type="button" className="btn btn-outline-info btn-sm"
                    onClick={this.props.changeState}>
                        { this.props.isDisplay ? "Close" : "Open"}
                    </button>
                </div>
                <div className="col-10" style={{ textAlign: "right"}}>
                    <p>
                        { this.state.time }
                    </p>
                </div>
            </div>
        )
    }
}

export default Clock;