import React, { useState } from "react";
import ToggleFav from './ToggleFav';


export default function DataRows({ ...props }) {

    let { data, display } = props;
 
    return data.map(element => {
     

     		//Return the colored text elements for the change values and a simple numbers for volume
        let template = [
            <td className={`text-right text-${element.change ? element.change >= 0 ? 'success' : 'danger' : 'gray'}`}>
		        			{element.change > 0 && '+' }{element.change.toFixed(2)}%
		        		</td>,
            <td className='text-right'>{parseInt(element.v)}</td>
        ]


        return (
            <tr key={element.s}>
		        		<td>
		        			<ToggleFav 
		        				s={element.s} 
		        				isFav={element.fav} 
		        				favs={props.favs} 
		        				toggleFav={props.toggleFav}
		        			/>
		        			{element.b}/{element.q} 
		        		</td>
		        		<td>
		        			{Number(element.c).toFixed(8)}
		        		</td>
		        		{template[display.selected]}
		        	</tr>
        )
    })



};