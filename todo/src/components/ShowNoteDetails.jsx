import React from "react";

function ShowDetails(props) {

    const createNote = (event) => {
        event.preventDefault();
        let note = {
            id: props.note.id,
            date: document.getElementById("NoteDate").value,
            title: document.getElementById("NoteTitle").value,
            content: document.getElementById("NoteContent").value,
        }
        props.updateNote(note);
    }
    
    return (
        <div style={{display: props.showDetails? "inline" : "None"}}>
            <div className="offset-2"></div>
            <div className="card creating-forms" style={{width: "40rem"}}>
                <div className="card-header">
                    <strong>Creating new note</strong>
                </div>
                <div className="card-body" style={{textAlign: "center"}}>
                    <form className="form-group" onSubmit={createNote}>
                        <div className="col-12">
                            <label className="col-form-label">Date and time:</label>
                            <input className="form-control" type="datetime-local" defaultValue={props.note.date} id="NoteDate"/>
                            <label>Title</label>
                            <input type="text" className="form-control" id="NoteTitle" placeholder="Title of your note" required
                            defaultValue={props.note.title}/>
                            <br/>
                            <label>Content</label>
                            <textarea className="form-control" id="NoteContent" placeholder="Input your content" required
                            defaultValue={props.note.content}/>
                            <br/>
                            <button className="btn btn-primary" type="submit">Update note</button>
                            <br/>
                            <p className="nav-link badge badge-success notes"
                                onClick={props.showNoteDetails.bind(this, props.note.id)}>
                                    Close
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ShowDetails;