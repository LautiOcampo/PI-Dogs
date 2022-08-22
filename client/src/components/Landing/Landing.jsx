import React from 'react';
import {Link} from 'react-router-dom';
import s from "./Landing.module.css"

export default function LandingPage(){
    return(
        <div className={s.landing} >
            <h1 className={s.title}> PI - DOGS </h1>
            <Link to = '/home'>
                <button className={s.boton} >Iniciar recorrido</button>
            </Link>
        </div>
    )
}