
import React from "react"
export default function SelectMenu({ setQuery }) {
    return (
        //  Click first option and  Alt + Second option
        //  shift+Alt+upArrow -----  option duplicat
        <select className="filter-by-region" onChange={(e) => setQuery(e.target.value.toLowerCase())}>
            <option hidden>Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
        </select>

    )
}