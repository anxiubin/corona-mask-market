import React from 'react';
import './App.css';
import Home from './components/Home';
import TimeSale from './components/TimeSale';
import RandomSale from './components/RandomSale';
import OfficialSale from './components/OfficialSale';
import CheerKR from './components/CheerKR';
import {BrowserRouter} from 'react-router-dom';
import {Route, Link} from 'react-router-dom';
import {DataProvider} from './DataContext';


function App() {
  return (
    <BrowserRouter>
        <DataProvider>
            <div id="fixed-bar">
                <div id="fixed-bar-wrap">
                    <div id="logo-wrap">
                        <Link to="/corona-mask-market/" id="home-link">
                            <img className="logo-img" alt="코로나마스크마켓" src="https://image.flaticon.com/icons/png/128/1033/1033165.png" />
                            <div className="logo-text">Corona Mask Market</div>
                        </Link>
                    </div>
                    <div id="category-wrap">
                        <div className="category">
                            <Link to="/corona-mask-market/TimeSale" className="glow"> Time </Link>
                        </div>
                        <div className="category">
                            <Link to="/corona-mask-market/RandomSale" className="glow"> Random </Link>
                        </div>
                        <div className="category">
                            <Link to="/corona-mask-market/OfficialSale" className="glow"> Official </Link>
                        </div>
                        <div className="category">
                            <Link to="/corona-mask-market/CheerKR" className="glow"> Support </Link>
                        </div>                
                    </div>
                </div>
            </div>
            <Route path="/corona-mask-market/" exact={true} component={Home} />
            <Route path="/corona-mask-market/TimeSale" component={TimeSale} />
            <Route path="/corona-mask-market/RandomSale" component={RandomSale} />
            <Route path="/corona-mask-market/OfficialSale" component={OfficialSale} />
            <Route path="/corona-mask-market/CheerKR" component={CheerKR} />

            <footer className="footer">subin</footer>
        </DataProvider>
    </BrowserRouter>
  );
}

export default App;