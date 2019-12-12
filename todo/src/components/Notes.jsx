import React from "react";
import AllNotes from "./AllNotes";
import CreateNote from "./CreateNote";
import ShowDetails from "./ShowNoteDetails";

class Notes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isCreating: false,
            add: false,
            categories: [],
            notes: [],
            index: 0,
            showDetails: false,
            noteId: 0,
        }
    }

    componentDidMount() {
        this.addCategoriesToState();
        this.addNotesToState();
    }

    addNewCategory = event => {
        event.preventDefault();
        fetch("/categories/new", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({category: document.getElementById("newCategory").value}),
        }).then(res => res.json())
            .then(data => {
                if (data === null) {
                    this.addCategoriesToState();
                }
            })
    }

    addCategoriesToState = () => {
        fetch("/categories")
            .then(res => res.json())
            .then(categories => {
                this.setState({
                    categories: categories,
                    add: false,
                    index: 0,
                })
            });
    }

    setCurrentCategory = id => {
        this.setState({
            index: id,
        })
    }

    removeCategory = id => {
        fetch(`/categories/delete/${id}`, {
            method: "DELETE", 
        }).then(res => res.json())
        .then(data => {
            if(data.errFromCategories === null && data.errFromNotes === null){
                this.addCategoriesToState();
                this.addNotesToState();
            }
        });
    }

    showAddingCategory = () => {
        this.setState({
            add: true,
        });
    }

    displayFormOfCreating = () => {
        this.setState({
            isCreating: !this.state.isCreating,
        });
    }

    addNewNote = (note) => {
        fetch("/notes/new", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({note: note}),
        }).then(res => res.json())
        .then(data => {
            if (data === null) {
                this.addNotesToState();
            }
        });
    }

    addNotesToState = () => {
        fetch("/notes")
            .then(res => res.json())
            .then(notes => {
                this.setState({
                    notes: notes,
                    isCreating: false,
                    showDetails: false,
                });
            });
    }

    removeNote = id => {
        fetch(`/notes/delete/${id}`, {
            method: "DELETE",
        }).then(res => res.json())
            .then(data => {
                if(data === null) {
                    this.addNotesToState();
                }
            })
    }

    showNoteDetails = id => {
        this.setState({
            noteId: this.state.notes.findIndex(note => note.id === id),
            showDetails: !this.state.showDetails,
        });
    }

    updateNote = note => {
        fetch(`/notes/update/${note.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({note: note})
        }).then(res => res.json())
            .then(data => {
                if (data === null) {
                    this.addNotesToState();
                }
            });
    }
    
    render() {
        return (
            <div className="col-12">
                <br/>
                <div className="row">
                    <div className="col-1" style={{textAlign: "center"}}>
                        <button type="button" className="btn btn-outline-success btn-sm"
                        onClick={this.displayFormOfCreating}>
                            Create
                        </button>
                    </div>
                    <CreateNote isCreating={this.state.isCreating} 
                        categories={this.state.categories}
                        addNewNote={this.addNewNote}
                        index={this.state.index}/>
                    {this.state.notes.length > 0 ? 
                    <ShowDetails 
                        showDetails={this.state.showDetails}
                        updateNote={this.updateNote} 
                        note={this.state.notes[this.state.noteId]}
                        showNoteDetails={this.showNoteDetails}/> : ""}
                    <div className="col-11" style={{textAlign: "center"}}>
                        <AllNotes addNewCategory={this.addNewCategory}
                            categories={this.state.categories}
                            removeCategory={this.removeCategory}
                            showAddingCategory={this.showAddingCategory}
                            add={this.state.add}
                            notes={this.state.notes}
                            index={this.state.index}
                            setCurrentCategory={this.setCurrentCategory}
                            removeNote={this.removeNote}
                            showNoteDetails={this.showNoteDetails}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Notes;