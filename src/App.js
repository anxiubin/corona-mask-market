import React from 'react';
import './App.css';
import Home from './components/Home';
import TimeSale from './components/TimeSale';
import {BrowserRouter} from 'react-router-dom';
import {Route, Link} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <div id="fixed-bar">
            <div id="fixed-bar-wrap">
                <div id="logo-wrap">
                    <Link to="/" id="home-link">
                        <img className="logo-img" alt="코로나마스크마켓" src="https://image.flaticon.com/icons/png/128/1033/1033165.png" />
                        <div className="logo-text">Corona Mask Market</div>
                    </Link>
                </div>
                <div id="category-wrap">
                    <div className="category">
                        <Link to="/TimeSale" className="glow"> Time </Link>
                    </div>
                    <div className="category">
                        <Link to="/TimeSale" className="glow"> Random </Link>
                    </div>
                    <div className="category">
                        <Link to="/TimeSale" className="glow"> Official </Link>
                    </div>
                    <div className="category">
                        <Link to="/TimeSale" className="glow"> Support </Link>
                    </div>                
                </div>
            </div>
        </div>

        <Route path="/" component={Home} />
        <Route path="/TimeSale" component={TimeSale} />
        
        <footer className="footer">subin</footer>
    </BrowserRouter>
  );
}

export default App;
