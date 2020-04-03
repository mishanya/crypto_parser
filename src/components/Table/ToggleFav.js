import React, { useState } from "react";
import * as favActions from './../../actions/favActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function ToggleFav({ ...props }) {

    //Render the star symbol and add a listener, triggering the action callback
    return (
        <span 
            onClick={()=> props.actions.toggleFav(props.s, !props.isFav, props.favs)}
            className='h__cursor_pointer pr-2'
        >
            {props.isFav ? '★' : '☆' }
        </span>
    )

};


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(favActions, dispatch)
    }
}
export default connect(mapDispatchToProps)(ToggleFav)