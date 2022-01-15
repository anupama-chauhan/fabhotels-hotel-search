import {useLocation} from "react-router";
import {Link} from "react-router-dom";
import "./index.scss"
import {useEffect} from "react";

const PlaceDetail = (props) => {
    const location = useLocation();
    const { state : { placeProp, hotels }} = location

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return <div className={"place-details"}>

        <h2>Showing results for Hotels in {placeProp.city}</h2>

        <div className={"listing"}>
            {hotels && hotels.length > 0 && hotels.map(hotel => {
                return <Link key={hotel.id}
                    to={`/details/${hotel.city.replace(' ','-').toLowerCase()}/${hotel.queryStr}`}
                    state={{ hotelProp: hotel }}
                >
                    <p>
                        <span>{hotel.hotelName}, </span>
                        {hotel.area.length > 0 && <span>{hotel.area}, </span>}
                        <span>{hotel.city}</span>
                    </p>
                    <i className="fas fa-external-link-alt"></i>
                </Link>
            })}
        </div>
    </div>
}

export default PlaceDetail