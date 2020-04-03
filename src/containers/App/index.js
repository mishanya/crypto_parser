import React, { Component } from "react";
import { connect } from 'react-redux';
  
import Header from './../../components/Header';
import Main from './../../components/Main';
import css from './style.css'

class App extends Component {

    render() {
        return [
            <Header key='Header'/>,
            <Main {...this.props} key='Main'/>
        ]
    }

}


//Get favs from local storage
function mapStateToProps(state) {
    return {
        favs: state.FavsReducer,
    }
}

 
export default connect( mapStateToProps)(App)