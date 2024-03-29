import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDogs, filterCreated, getTemperaments, filterByTemperaments, orderByName, orderByWeight } from '../../actions'
import {Link} from 'react-router-dom'
import Card from '../Card/Card.jsx'
import Paginado from '../Paginado/Paginado.jsx'
import SearchBar from '../SearchBar/SearchBar'
import s from './Home.module.css'

export default function Home (){
    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.dogs)
    
    const [currentPage, setCurrentPage] = useState (1)
    const [dogsPerPage, setDogsPerPage] = useState (8)
    const indexOfLastDog = currentPage * dogsPerPage   //  8 / 16 / 24
    const indexOfFirstDog = indexOfLastDog - dogsPerPage  // 0 / 8 / 16
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

useEffect (() =>{
    dispatch(getDogs())
    dispatch(filterByTemperaments())
    dispatch(getTemperaments())
},[dispatch])

const temperaments = useSelector((state) => state.temperaments)
const [temperament, setTemperament] = useState("All")


function handleClick(e){
    e.preventDefault();
    dispatch(getDogs());
    setOrden("");
    setOrdenByWeight("");
    setRazas('breeds');
    setTemperament("All")
    setCurrentPage(1)
}

const [ordenByName, setOrden] = useState ('')
function handleSortByName(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1)
    setOrden(e.target.value)
    setOrdenByWeight("")
}

const[ordenByWeight, setOrdenByWeight] = useState ('')
function handleOrderByWeight(e){
    e.preventDefault();
    dispatch(orderByWeight(e.target.value))
    setCurrentPage(1)
    setOrdenByWeight(e.target.value)
    setOrden("")
}

function handleFilterTemperaments(e) {
    dispatch(filterByTemperaments(e.target.value))
    setTemperament(e.target.value)
}



const [razas, setRazas] = useState('breeds')
function handleFilterCreated(e){
    dispatch(filterCreated(e.target.value))
    setRazas(e.target.value)
    setCurrentPage(1)
}


return(
    <div className={s.fondo} >
        {/* <h1>Dogs App</h1> */}
        <div className={s.nav}>
        <button className={s.botonreload} onClick={e=>{handleClick(e)}}>
            Volver a cargar todos los perros
        </button>
        <Link className={s.botoncrear} to = '/dogs'>Crear Perro</Link>
        <SearchBar/>
        </div>
        <div className={s.inputs} >
            <span> Ordenar Por Nombre  </span>
            <select value={ordenByName} onChange={e =>handleSortByName(e)}>
                <option value='---'>---</option>
                <option value='az'>Ascendente</option>
                <option value='za'>Descendente</option>
            </select>

            <span> Ordenar Por Peso  </span>
            <select  value={ordenByWeight} onChange={e => handleOrderByWeight(e)}>
                <option value=''>---</option>
                <option value='min'>Lightest</option>
                <option value='max'>Heaviest</option>
            </select>

            <span> Filter By Breed  </span>
            <select value={razas} onChange={e => handleFilterCreated(e)}>
                <option value="breeds">All</option>
                <option value="created">Created</option>
                <option value="api"> Existentes</option>
            </select>
            
            <span>Filter by temperament </span>
            <select value={temperament} onChange={e => handleFilterTemperaments(e)}>
                <option value='All'>All</option>
                {temperaments.map((temp, index) => (
                <option onClick={(e) => handleClick(e)} key={index}>{temp.name}</option>
                            ))}
            </select>



            </div>

            <div className={s.cardcontainer}>

            {currentDogs?.map((c) => {
                return(
                    <div >
                        <Link to={"/dog/" + c.id}>
                            <Card 
                            name={c.name} 
                            image={c.image} 
                            key={c.id}
                            maxWeight={c.maxWeight}
                            minWeight={c.minWeight}
                            minHeight={c.minHeight}
                            maxHeight={c.maxHeight}
                            temperament={c.temperament}
                            // temperaments={c.temperaments?.map((t) => t.name).join(', ')}
                            />
                        </Link>
                    </div>
                )
            })

            
            }

</div>

            {/* <div className={s.pag} > */}
            <Paginado 
            dogsPerPage={dogsPerPage}
            allDogs={allDogs.length}
            paginado={paginado}
            />
            {/* </div> */}


        </div>
    
)


}