import React from "react";

function CreateNotes(props) {

    const createNote = (event) => {
        event.preventDefault();
        let note = {
            date: document.getElementById("date").value,
            category: props.categories[document.getElementById("category").value].id,
            title: document.getElementById("title").value,
            content: document.getElementById("content").value,
        }
        props.addNewNote(note);
        document.getElementById("date").value = strOfDate;
        document.getElementById("title").value = "";
        document.getElementById("content").value = "";
    }

    let currentDate = new Date();
    let currentDay = String(currentDate.getDay() + 1).length === 2 ? currentDate.getDay() + 1 : 
        "0" + (currentDate.getDay() + 1);
    let currentMonth = String(currentDate.getMonth() + 1).length === 2 ? currentDate.getMonth() + 1 : 
        "0" + (currentDate.getMonth() + 1);
    let currentTime = currentDate.toTimeString().split(" ")[0].split(":");
    let strOfDate = `${currentDate.getFullYear()}-${currentMonth}-${currentDay}T${currentTime[0]}:${currentTime[1]}`;
    
    return (
        <div style={{display: props.isCreating? "inline" : "None"}} >
            <div className="card creating-forms" style={{width: "40rem"}}>
                <div className="card-header">
                    <strong>Creating new note</strong>
                </div>
                <div className="card-body" style={{textAlign: "center"}}>
                    <form className="form-group" onSubmit={createNote}>
                        <div className="col-12">
                            <label className="col-form-label">Date and time:</label>
                            <input className="form-control" type="datetime-local" defaultValue={strOfDate} id="date"/>
                            <br/>
                            <label className="col-form-label">Choose category:</label>
                            <select id="category" className="custom-select" required>
                                {props.categories.map((category, index) => {
                                        return <option key={index} 
                                            value={index}>{category.category_name}</option>
                                })}
                            </select>
                            <br/><br/>
                            <label>Title</label>
                            <input type="text" className="form-control" id="title" placeholder="Title of your note" required/>
                            <br/>
                            <label>Content</label>
                            <textarea className="form-control" id="content" placeholder="Input your content" required/>
                            <br/>
                            <button className="btn btn-primary" type="submit">Create note</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateNotes;