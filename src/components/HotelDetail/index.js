import {useLocation} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import './index.scss'

import axios from "axios";
import PageNotFound from "../PageNotFound";


const HotelDetail = (props) => {
        const location = useLocation();
        const dispatch = useDispatch();

        const hotel = useSelector(state => state.hotelData);

        useEffect(() => {
                window.scrollTo(0,0)
                if(location?.state?.hotelProp){
                        const {hotelProp} = location.state;
                        let apiUrl = `https://www.fabhotels.com/consumer/v1/mweb/properties/details?property=fabhotel-${hotelProp.queryStr || ''}&city=${hotelProp.city || ''}`

                        axios.get(apiUrl).then(res => {
                                dispatch({
                                        type: 'fetch/hotelData',
                                        payload: res?.data?.data || {},
                                });
                        })

                }
        }, [])


        return (
            <>
                    {!location.state && <PageNotFound />}
                    {location?.state?.hotelProp && <div className="hotel-details">
                        <div className="content-wrapper">
                                <div className="about">
                                        <div className="left-section">
                                                <div className="name-container">
                                                        <h4>{hotel.name}</h4>
                                                        <div className="loc">
                                                                <i className="fas fa-map-marker-alt"></i>
                                                                <span>{hotel.addressLocality}, {hotel.city}</span>
                                                        </div>
                                                </div>

                                                <img className={"main-img"} src={hotel.imageUrl} alt={"Hotel Image"}/>
                                                <div className={"other-imgs"}>
                                                        {hotel.imagesList && Object.keys(hotel?.imagesList).map((key, i) => {
                                                                if(key !== "Main"){
                                                                        return (
                                                                            <img src={`${hotel.imagesList?.[key].baseUrl}/${hotel.imagesList?.[key].images[0].url}`} alt={"hotel image"} key={i}/>
                                                                        )
                                                                }
                                                        })
                                                        }
                                                </div>
                                        </div>
                                        <div className="right-section">
                                                <div className={"top-section"}>
                                                        <div className="rating-container">
                                                                <div className={"rating"}>
                                                                        {hotel.rating}
                                                                </div>
                                                                <div className={"rating-text"}>
                                                                        <p>{hotel.ratingText}</p>
                                                                        <span>{hotel.reviews?.count || 0} Reviews</span>
                                                                </div>
                                                        </div>
                                                        {hotel.reviews?.filtersText.length > 0 && <div className={"guest-recommend"}>
                                                                {hotel.reviews?.filtersText.map((text, i) => {
                                                                        return <p key={i}>
                                                                                <i className="far fa-check-circle"></i>
                                                                                <span>{text}</span>
                                                                        </p>
                                                                })}
                                                        </div>}
                                                </div>

                                                <div className={"other-details"}>
                                                        <div className={"why-fh"}>
                                                                <span>Why this FabHotel?</span>
                                                                <img src={hotel.disruptionAlerts?.banner.img} alt={"safety-img"} />
                                                        </div>
                                                        <div className={"nearby"}>
                                                                <i className="fas fa-utensils"></i>
                                                                {<span>{hotel.nearByRestaurantText}</span>}
                                                        </div>
                                                        <div className={"nearby"}>
                                                                <i className="fas fa-map-marked-alt"></i>
                                                                {<span>{hotel.nearByLandmarkText}</span>}
                                                        </div>
                                                        <div className={"address"}>
                                                               <p>Hotel Address</p>
                                                                <span>{hotel.propertyAddress}</span>
                                                        </div>
                                                        {hotel.reviews && <div className={"review-keywords"}>
                                                                <p className={"heading"}>Known for</p>
                                                                {hotel.reviews.reviewKeywords.length > 0 && hotel.reviews.reviewKeywords.map((i, index) => {
                                                                        return <p key={index} className={"feature"}>
                                                                                <i className="far fa-check-circle"></i>
                                                                                <span>{i}</span>
                                                                        </p>
                                                                })}
                                                        </div>}
                                                </div>
                                        </div>
                                </div>

                                <div className="amenities">
                                        <h4>Hotel Amenities</h4>
                                        <div>
                                                {hotel.amenities?.map((amenity, index) => {
                                                        return <p key={index} className={"feature"}>
                                                                <img src={amenity.icon} />
                                                                <span>{amenity.text}</span>
                                                        </p>
                                                })}
                                        </div>
                                </div>
                        </div>
                    </div> }
            </>
        )
}

export default HotelDetail