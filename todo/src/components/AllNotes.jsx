import React from "react";
import classNames from "classnames";

class AllNotes extends React.Component {

    showAllNotesFromCategory = () => {
        if(this.props.categories.length > 0) {
        const category = this.props.categories[this.props.index];
            return this.props.notes
                .filter(note => category.id === note.category_id)
                .map(note => {
                    return (
                        <div key={note.id} className="col-3">
                            <div className="card" style={{width: "15rem"}}>
                                <div className="card-body">
                                    <h5 className="card-title">{note.title}</h5>
                                    <p className="card-text">
                                        { note.content.length <= 50 ? note.content : 
                                        note.content.slice(0, 50) + "..." }
                                    </p>
                                    <button className="btn btn-primary notes" 
                                        onClick={this.props.showNoteDetails.bind(this, note.id)}>
                                        Show details
                                    </button>
                                    <br/>
                                    <p className="nav-link badge badge-success notes"
                                    onClick={this.props.removeNote.bind(this, note.id)}>
                                        Delete
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                });
        }
    }

    render() {
        let addNewCategory = this.props.add ?
        <form className="form-inline" onSubmit={this.props.addNewCategory}>
            <div className="form-group mx-sm-3 mb-2">
                <input className="form-control" id="newCategory" placeholder="New category"/>
            </div>
            <button type="submit" className="btn btn-primary mb-2">Add</button>
        </form>: 
        <p className="nav-link badge badge-success notes" 
        onClick={this.props.showAddingCategory}>
            Add
        </p>
        return(
            <div className="card text-center">
                <div className="card-header">
                    <ul className="nav nav-pills card-header-pills">
                        { this.props.categories.map((category, index) => {
                            return (
                                <li className="nav-item" key={category.id}>
                                    <p className={classNames("nav-link", "notes", {
                                        "active": index === this.props.index})}
                                        onClick={this.props.setCurrentCategory.bind(this, index)}
                                        onDoubleClick={this.props.removeCategory.bind(this, category.id)}>
                                        {category.category_name}
                                        </p>
                                </li>
                            )
                        })}
                    <li className="nav-item">
                        {addNewCategory}
                    </li>
                    </ul>
                </div>
                <div className="card-body">
                    <div className="row">
                        {this.showAllNotesFromCategory()}
                    </div>
                </div>
            </div>
        )
    }
}

export default AllNotes;