import Logo from '../../assets/fab-hotels-logo.png'
import {Link} from "react-router-dom";
import './index.scss';

const Header = () => {
    return <div className="header">
        <Link to={"/"}><h1><img className={"logo"} src={Logo} alt={"Fab Hotels"} /></h1></Link>
        <span>Assignment by <a href={"https://www.linkedin.com/in/anupamachauhan"} target="_blank"> Anupama</a></span>
    </div>
}

export default Header;