import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getName } from "../actions";

export default function SearchBar({}){
    const dispatch = useDispatch()
    const [name, setName] = useState('')

function handleInputChange(e){
    e.preventDefault();
    setName(e.target.value);
    console.log(name)
}

function handleSubmit(e){
    e.preventDefault();
    dispatch(getName(name));
    setName("")
}

    return(
        <div>
            <input 
            onChange={(e) => handleInputChange(e)}
            type = "text"
            placeholder="Buscar la raza..."
            value={name}
            />
            <button onClick={(e) => handleSubmit(e)} type="submit">Buscar</button>
        </div>
    )
}