import './index.scss';
import {Link} from "react-router-dom";
import {useEffect} from "react";

const PageNotFound = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return <div className="page-not-found">
        <h1>404 Not Found</h1>
        <div>Oops! Looks like this page does not exist!</div>

        <Link to={'/'}>
            Back to Homepage
        </Link>
    </div>
}

export default PageNotFound