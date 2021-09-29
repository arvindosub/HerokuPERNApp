import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListTodos = () => {

    const [todos, setTodos] = useState([]);
    const [remCap, setRemCap] = useState();

    const getTodos = async () => {
        try {
            const response = await fetch("/todos");
            const jsonData = await response.json();
            setTodos(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    const getCap = async () => {
        try {
            const response = await fetch("/cap");
            var cap = await response.json();
            setRemCap(cap);
        } catch (err) {
            console.error(err.message);
        }
    }
    
    const deleteTodo = async id => {
        try {
            const deleteTodo = await fetch(`/todos/${id}`, { method: "DELETE" });
            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    }
    
    useEffect(() => {
        getTodos();
        getCap();
    }, []);

    return (
        <Fragment>
            <table className="table mt-5 text-center table-striped align-middle">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td>
                                <EditTodo todo={todo} />
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h4 className="text-center mt-5">Remaining Capacity: {remCap}</h4>
            <p className="text-center">(calculated by calling Python script from NodeJS)</p>
        </Fragment>
    );
};

export default ListTodos;