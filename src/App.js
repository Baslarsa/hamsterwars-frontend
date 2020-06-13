import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import RecentGames from "./components/RecentGames"
import Start from "./components/Start"
import Charts from "./components/Charts"
import Battle from "./components/battle/Battle"
import CustomBattle from "./components/battle/CustomBattle"
import Hamsters from "./components/Hamsters"
import Upload from "./components/Upload"
import './App.css';

function App() {
    return (
        <Router className="App">
            <Switch>
                <Route path="/">
                    <header>
                        <h1>HAMSTERWARS</h1>
                    </header>
                    <nav className="nav">
                        <NavLink to="/start" activeClassName="active">Start</NavLink>
                        <NavLink to="/battle" activeClassName="active">Battle </NavLink>
                        <NavLink to="/recent-games" activeClassName="active">Recent Games </NavLink>
                        <NavLink to="/charts" activeClassName="active">Charts</NavLink>
                        <NavLink to="/hamsters" activeClassName="active">Hamsters</NavLink>
                        <NavLink to="/upload" activeClassName="active">Upload Hamster</NavLink>
                    </nav>
                </Route>
            </Switch>
            <main>
                <Switch>
                    <Route path="/battle/:id1/:id2" children={<CustomBattle />} />
                    <Route path="/recent-games"> <RecentGames /></Route>
                    <Route path="/battle"> <Battle /></Route>
                    <Route path="/charts"> <Charts /></Route>
                    <Route path="/hamsters"> <Hamsters /></Route>
                    <Route path="/upload"> <Upload /></Route>
                    <Route path="/"> <Start /></Route>
                </Switch>
            </main>
        </Router>
    );
}
export default App;
