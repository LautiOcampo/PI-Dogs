import React from 'react';
import s from "./Paginado.css"


export default function Paginado ({dogsPerPage, allDogs, paginado}){
    const pageNumbers = []

    for ( let i=1; i<=Math.ceil(allDogs/dogsPerPage); i++){
        pageNumbers.push(i)
    }

    return(
        <nav>
            <div className={s.pagination} >
                {pageNumbers?.map(number => (
                    <div className='number' 
                   onClick={() => paginado(number)}>{number}
                    </div>
                ))}
            </div>
        </nav>
    )



}