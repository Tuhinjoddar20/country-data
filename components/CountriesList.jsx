

import React, { useEffect, useState } from "react";

import CountryCard from "./CountryCard";
import CountryListShimmer from "./CountryListShimmer";

export default function CountriesList({ query }) {
    const [CountriesData, setCountriesData] = useState([])
    // console.log("dddd", CountriesData); first load, it is empty[] array.
    // and second, CountriesData -----  [250] and passing filter().
    // setCountriesData  pass in  CountriesData.

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then((res) => res.json())
            .then((data) => {
                setCountriesData(data); // all api data store [250]

            });

    }, [])

    if (!CountriesData.length) {
        return <CountryListShimmer />
    }

    return (
        <>
            <div className="countries-container">
                {

                    CountriesData.filter((filterCountry) =>
                        filterCountry.name.common.toLowerCase().includes(query) || filterCountry.region.toLowerCase().includes(query)
                    )
                        .map((country) => {
                            return (
                                <CountryCard
                                    key={country.name.common}
                                    name={country.name.common}
                                    flag={country.flags.svg}
                                    population={country.population}
                                    region={country.region}
                                    capital={country.capital?.[0] || "N/A"}
                                    data={country}
                                />
                            );
                        })
                }
            </div>

        </>
    )
}






