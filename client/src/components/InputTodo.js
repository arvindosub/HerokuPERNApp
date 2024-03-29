import React, { Fragment, useState } from "react";

const InputTodo = () => {

    const [description, setDescription] = useState("")

    const onSubmitForm = async(e) => {
        e.preventDefault()
        try {
            const body = { description };
            const response = await fetch("/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h1 className="text-center mt-5">ToDo List</h1>
            <p className="text-center">(list items are added to and read from PostgreSQL database)</p>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input 
                    type="text" 
                    className="form-control" 
                    value={description} 
                    onChange={e => setDescription(e.target.value)}
                />
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    );
}

export default InputTodo;