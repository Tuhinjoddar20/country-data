
// rfc --- Enter ----> automatic Create
export default function SearchBar({ setQuery }) {

    return (
        <div className="search-container">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input

                // onChange={(e) => setQuery(e.target.value.toLowerCase())}  ----------- Search function code

                onChange={(e) => setQuery(e.target.value.toLowerCase())}
                type="text"
                className="input"
                placeholder="Search for a country....." />
        </div>
    )
}