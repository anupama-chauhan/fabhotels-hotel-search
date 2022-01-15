import {useEffect, useState} from "react";
import mockSearchResults from "../../constants/mockSearchResults";
import {Link} from "react-router-dom";
import './index.scss'

const SearchBar = () => {
    const [hotelSuggestions, setHotelSuggestions] = useState([]);
    const [placeSuggestions, setPlaceSuggestions] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const getSuggestions = (e) => {
        let _query = e.target.value.toLowerCase().trim(),
            _placeResults = [],
            _hotelResults = []

        setQuery(e.target.value);
        if(!_query.length){
            setPlaceSuggestions([]);
            setHotelSuggestions([]);
        }
        else{
            _placeResults = mockSearchResults.places.filter((i) => i.city.toLowerCase().startsWith(_query)
                // || i.area.toLowerCase().startsWith(_query)
            )
            _hotelResults =  mockSearchResults.hotels.filter((i) => i.hotelName.toLowerCase().includes(_query)
                || i.city.toLowerCase().includes(_query)
                || i.area.toLowerCase().includes(_query))

            setPlaceSuggestions(_placeResults);
            setHotelSuggestions(_hotelResults);
        }
    }

    return < div className="search-container">
        <div className="search-bar">
            <input
                type="text"
                name="searchbar"
                value={query}
                placeholder={"Search (Eg: New Delhi, Gurgaon, FabHotel Prime Sage etc.)"}
                onChange={getSuggestions}
            />

            {(hotelSuggestions.length > 0
            || placeSuggestions.length > 0) && <div className="suggestion-dropdown">
                {placeSuggestions.length > 0 && <div className="category">
                    <h2>Places</h2>
                    <ul>
                        {placeSuggestions.map((p, index) => {
                            let filteredHotels = mockSearchResults.hotels?.filter(h => h.city === p.city)
                            return (
                                <Link
                                    key={p.id}
                                    to={`/details/${p.city.replace(' ','-').toLowerCase()}`}
                                    state={{ placeProp: p, hotels: filteredHotels }}
                                >
                                    <li key={p.id}>
                                        <i className="fas fa-map-marker-alt"></i>
                                        <span>{p.city}</span>
                                    </li>
                                </Link>
                            )
                        })}
                    </ul>
                </div>}

                {hotelSuggestions.length > 0 && <div className="category">
                    <h2>Hotels</h2>
                    <ul>
                        {hotelSuggestions.map(i => {
                            return (
                                <Link
                                    key={i.id}
                                    to={`/details/${i.city.replace(' ','-').toLowerCase()}/${i.queryStr}`}
                                    state={{ hotelProp: i }}
                                >
                                    <li>
                                        <i className="fas fa-hotel"></i>
                                        <span>{i.hotelName}, </span>
                                        {i.area.length > 0 && <span>{i.area}, </span>}
                                        <span>{i.city}</span>
                                    </li>
                                </Link>
                            )
                        })}
                    </ul>
                </div>}
            </div>}
        </div>



    </div>
}

export default SearchBar