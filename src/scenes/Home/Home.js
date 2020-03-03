import React from 'react';
import Header from './components/Header/Header';
import { Route, Switch } from 'react-router-dom';
import HomeView from './scenes/Home';
import BlockView from './scenes/Block';
import BundleView from './scenes/Bundle';
import Block_detailView from './scenes/Block_detail';
import Bundle_detailView from './scenes/Bundle_detail';
import Transaction from './scenes/Transaction';
import Account from './scenes/Account';
import NotFound from './scenes/Notfound';

import './Home.css';

class Home extends React.Component{
    constructor(props)
    {
        super(props);
    }
    
    render()
    {
        // console.log("Home->", this.props)
        return(
            <div>
                <Header {...this.props}/>
                <Switch>
                    <Route path="/"        exact   render={() => <HomeView  />} />
                    <Route path="/home"    exact   render={() => <HomeView  />} />
                    <Route path="/blocks"    exact   render={() => <BlockView  />} />
                    <Route path="/bundles"    exact   render={() => <BundleView  />} />
                    <Route path="/blocks/:hash"    exact   render={props=>(<Block_detailView  key={props.match.params.hash}{...props}/>)  } />
                    <Route path="/bundles/:bundleId"    exact   render={props=>(<Bundle_detailView key={props.match.params.bundleId}{...props}/>) } />
                    <Route path="/transactions/:hash"    exact   render={props=>(<Transaction key={props.match.params.bundleId}{...props}/>) } />
                    <Route path="/transactions/:hash"    exact   render={props=>(<Transaction key={props.match.params.bundleId}{...props}/>) } />
                    <Route path="/addresses/:address"    exact   render={props=>(<Account key={props.match.params.address}{...props}/>) } />
                    <Route path='*' component={NotFound} />
                </Switch>
            </div>
        )
    }
}
export default Home;