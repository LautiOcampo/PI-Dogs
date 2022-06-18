import React from 'react';
// import s from "./Paginado.css"


export default function Paginado ({dogsPerPage, allDogs, paginado}){
    const pageNumbers = []

    for ( let i=1; i<=Math.ceil(allDogs/dogsPerPage); i++){
        pageNumbers.push(i)
    }

    return(
        <nav>
            <ul className='paginado'>
                {pageNumbers?.map(number => (
                    <li className='number' key={number}>
                    <a onClick={() => paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )


    //Codigo completo del seba
    // return (
    //     <nav>
    //         <div className = {s.pagination}>
    //             <div className={s.number}>«</div>
    //             {pageNumbers?.map(number => (
    //                     <div className={ currentPage === number ? s.pageActual : s.number} onClick = {() => paginado(number)}>
    //                         {number}
    //                     </div>
    //             ))} 
    //             <div className={s.number} onClick={paginadoNext} >»</div>
    //         </div>
    //     </nav>
    // ) 


    
    //Codigo de seba reducido
    // return (
    //     <nav>
    //             {pageNumbers?.map(number => (
    //                     <div onClick = {() => paginado(number)}>
    //                         {number}
    //                     </div>
    //             ))} 
    //     </nav>
    // ) 



}