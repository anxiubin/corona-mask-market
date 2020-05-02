import React from 'react';
import './App.css';
import { fire } from './FirebaseInit';
import Home from './components/Home';
import TimeSale from './components/TimeSale';
import RandomSale from './components/RandomSale';
import OfficialSale from './components/OfficialSale';
import CheerKR from './components/CheerKR';
import {BrowserRouter} from 'react-router-dom';
import {Route, Link} from 'react-router-dom';
import {DataProvider} from './DataContext';
import { AiFillGithub } from "react-icons/ai";
import { MdMail } from "react-icons/md";
import { IconContext } from "react-icons";

function App() {
    fire();
  return (
    <BrowserRouter>
        <DataProvider>
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
                            <Link to="/RandomSale" className="glow"> Random </Link>
                        </div>
                        <div className="category">
                            <Link to="/OfficialSale" className="glow"> Official </Link>
                        </div>
                        <div className="category">
                            <Link to="/CheerKR" className="glow"> Support </Link>
                        </div>                
                    </div>
                </div>
            </div>
            <Route exact path="/" component={Home} />
            <Route path="/TimeSale" component={TimeSale} />
            <Route path="/RandomSale" component={RandomSale} />
            <Route path="/OfficialSale" component={OfficialSale} />
            <Route path="/CheerKR" component={CheerKR} />

            <footer>
                <div className="footer-container">
                    <p className="footer-icons">
                        <a href="https://github.com/anxiubin/corona-mask-market" rel="noopener noreferrer" target="_blank">
                        <IconContext.Provider value={{ color: "black", size: 20}}>
                            <AiFillGithub />
                        </IconContext.Provider>
                        </a>
                        <a href="a.tnqls0120@gmail.com" target="_blank">
                        <IconContext.Provider value={{ color: "black", size: 20}}>
                        <MdMail />
                        
                        </IconContext.Provider>
                            </a>
                    </p>
                    <p className="footer-copyright">© 2020  Subin Ahn</p>
                </div>
            </footer>
        </DataProvider>
    </BrowserRouter>
  );
}

export default App;