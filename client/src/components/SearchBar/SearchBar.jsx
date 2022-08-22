import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getName } from "../../actions";
import s from './SearchBar.module.css'

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
        <div className={s.contenedorsearch} >
            <input className={s.inputSearch}
            onChange={(e) => handleInputChange(e)}
            type = "text"
            placeholder="Buscar la raza..."
            value={name}
            />
            <button className={s.search}  onClick={(e) => handleSubmit(e)} type="submit">Buscar</button>
        </div>
    )
}