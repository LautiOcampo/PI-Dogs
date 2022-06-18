import React from 'react';
import {Link} from 'react-router-dom';
import s from "./Landing.module.css"

export default function LandingPage(){
    return(
        <div className={s.landing} >
            <h1> Welcome to Dogs API </h1>
            <Link to = '/home'>
                <button>Ingresar</button>
            </Link>
        </div>
    )
}