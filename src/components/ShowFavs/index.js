import React  from "react";
 

 export default function ShowFavs({...props}) {

 		//A switcher , triggering caalback to change the show mode -
 		// the favourites only or all the stuff

 	 return (
	 	 	<span 
	 	 		onClick={() => props.selectFavs(!props.favsShown)}
	 	 		className='h__cursor_pointer'
	 	 	>
	 	 		{props.favsShown ? '★' : '☆' }
	 	 	</span>
	 	)
 }


 			 

 
        