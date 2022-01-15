import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import HotelDetail from "./components/HotelDetail";
import PlaceDetail from "./components/PlaceDetail";
import PageNotFound from "./components/PageNotFound";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import './styles/reset.scss';


function App() {
  return (
      <BrowserRouter>
          <div className="App">
              <Header />

              <div className="content-container">
                  <Routes>
                      <Route path="/" exact element={<SearchBar />}/>
                      <Route path="/details/:place" exact element={<PlaceDetail />}/>
                      <Route path="/details/:place/:hotel" exact element={<HotelDetail />}/>
                      <Route path="*" element={<PageNotFound />} />
                  </Routes>
              </div>

              <Footer />
          </div>
      </BrowserRouter>

  );
}

export default App;
