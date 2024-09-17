
import React, { useEffect, useState } from 'react'

import './CountryDetail.css'
import '../style.css'
import { Link, useLocation, useParams } from 'react-router-dom';
import CountryDetailShimmerEffect from './CountryDetailShimmerEffect';
import { useTheme } from '../Hooks/useTheme';


export default function CountryDetail() {

  const [isDark] = useTheme()

  // pass data on page to another page.
  const { state } = useLocation();

  // params return a object.
  const params = useParams();

  const countryName = params.country;

  const [countryData, setcountryData] = useState(null);

  const [notFound, setnotFound] = useState(false);



  function updateCountryData(data) {
    setcountryData({

      name: data.name.common,
      nativeName: Object.values(data.name.nativeName || {})[0]?.common || "N/A",
      population: data.population.toLocaleString(),
      region: data.region,
      subregion: data.subregion || "N/A",
      capital: (data.capital && data.capital.join(', ')) || "N/A",
      topLevelDomain: data.tld || "N/A",
      currencies: Object.values(data.currencies || {}).map(currency => currency.name).join(", ") || "N/A",
      languages: Object.values(data.languages || {}).join(", ") || "N/A",
      flag: data.flags.svg,
      borders: [],

    })

    if (!data.borders) {
      data.borders = []
    }
    // map() return promise.
    Promise.all(data.borders.map((border) => {
      return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
        .then((res) => res.json())
        .then(([borderCountry]) => borderCountry.name.common)

    })).then((allBorderName) => {
      setcountryData((prevState) => ({ ...prevState, borders: allBorderName }))

      //setTimeout(() => setcountryData((prevState) => ({ ...prevState, borders: allBorderName })))

    }).catch((err) => console.log(err))
  }

  useEffect(() => {

    if (state) {
      updateCountryData(state)
      return
    }

    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        updateCountryData(data);

      }).catch(error => {
        setnotFound(true);
      })
  }, [countryName])

  if (notFound) {
    return <div className='pageNotFound'> Country not Found </div>
  }

  return (countryData === null ? ("loading...") :

    (
      <main className={`${isDark ? 'dark' : ''}`}>

        <div className="country-details-container">
          <span className="back-btn" onClick={() => history.back()}>
            <i className="fa-solid fa-arrow-left"></i> &nbsp;Back
          </span>
          {/* <CountryDetailShimmerEffect /> */}
          {countryData === null ? (
            <CountryDetailShimmerEffect />
          ) : (
            <div className="country-details">
              <img src={countryData.flag} alt={`${countryData.name} flag`} />
              <div className="details-text-container">
                <h1 className="country-name">{countryData.name}</h1>
                <div className="details-text">
                  <p><b>Native Name : </b><span className="native-name">{countryData.nativeName}</span></p>
                  <p><b>Population : </b><span className="population">{countryData.population}</span></p>
                  <p><b>Region : </b><span className="region">{countryData.region}</span></p>
                  <p><b>Sub Region : </b><span className="subregion">{countryData.subregion}</span></p>
                  <p><b>Capital : </b><span className="capital">{countryData.capital}</span></p>
                  <p><b>Top Lavel Domain : </b> <span className="domain">{countryData.topLevelDomain}</span></p>
                  <p><b>Currencies : </b><span className="currencies">{countryData.currencies}</span></p>
                  <p><b>Language : </b><span className="language">{countryData.languages}</span></p>

                </div>
                {countryData.borders.length !== 0 && <div className="border-countries">
                  <b>Border Countries : {
                    countryData.borders.map((border) => <Link className="borderGap" key={border} to={`/${border}`}>{border}</Link>)
                  }
                  </b>

                </div>}
              </div>
            </div>)}
        </div>
      </main>

    )
  )
}
