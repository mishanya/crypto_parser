import React, { useRef } from "react";
import ToggleFav from './ToggleFav';


export default function SortPanel({ ...props }) {

		let {sort, display, sortTable} = props;

		let switcher = (prop) => {
			
			//A function returning markup and a callback trigger for each prop we can sort the table by
			let propIsSelected = sort.prop === prop;
			return (
				<span 
					onClick={() => sortTable(prop, propIsSelected ? !sort.order : true)} 
					className={`h__cursor_pointer ${propIsSelected ? 'text-warning' : 'text-gray'}`}
				> 
					{propIsSelected ? sort.order	 ? '⏶' : '⏷' : '⏷'} 
				</span>
			)
		}

 
    return (
       
    	<tr>
				 <td className='sort__td'>
				 	Pair {switcher('s')}
				 </td>
				 <td className='sort__td'>
					Last price { switcher('c')}
				 </td>
				 <td  className='text-right sort__td'>
						{display.options[display.selected].title} {switcher(display.options[display.selected].name)}		 
					</td>
			</tr>
    )

};