import React, { useRef } from "react";
import ToggleFav from './ToggleFav';


export default function SearchPanel({ ...props }) {


		//Here we initiate searching and toggle the display property - change or volume
		// It would be better to split it into two components to make code cleaner
    return (
        <thead className='col-2 position-relative'>
          	<tr>
						 <th className='border-0'>
						 	<input 
						 		type='text' 
						 		ref={props.searchInput} 
						 		onInput={ props.search} 
						 		placeholder='Start typing...'
						 		className='input border-bottom border-top-0 border-left-0 border-right-0'
						 	/>
						 </th>
						  
						 <th className='text-right border-0' colSpan={2}>
						 		<div className="btn-group btn-group-toggle" data-toggle="buttons">
						 			{
						 				props.display.options.map((el, i) => {
							 				return (
							 					 <label className={`btn btn-secondary ${props.display.selected == i && 'active'} h__cursor_pointer`} key={el.name}>
												    <input 
												    	type="radio" 
												    	name="options"  
												    	autoComplete="off" 
 												    	onChange={() => props.setDisplay(i)} 
												    /> 
												    {el.title}
												  </label>
							 				)
							 			})
							 		}		  
								</div>
							</th>
						 </tr>
					</thead>
    )

};