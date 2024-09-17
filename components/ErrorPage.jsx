
import React from 'react'
import { useRouteError } from 'react-router-dom'


export default function ErrorPage() {
    const error = useRouteError();
    console.log(error);
    return (
        <div className='ErrorPages-container'>
            <div className='ErrorPages'>
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>

                <p>
                    <i>{error.statusText}</i>
                    <i>{error.status}</i>
                </p>
            </div>
        </div>
    )
}
