import React from "react";


export default ({ selected, selectFilter, category }) => {



    //A separate component to initiate filtering by the category, not by market
    const categoryIsSelected = selected.filter === category.name && selected.type === 'pn';
    const handleClick = e => {
        //Prevent the click propagation, in this way the market parent button won't be clicked
        e.stopPropagation();
        !categoryIsSelected && selectFilter('pn', category.name)
    }

    return (
        <div 
    		className={`h__cursor_pointer border-round ${categoryIsSelected ? 'bg-dark' : 'h__hover_dark'} py-2 px-3`}
    		onClick={(e) => handleClick(e)}
    	>
    		{category.name}		
    	</div>
    )

};