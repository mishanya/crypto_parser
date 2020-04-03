import React, { useState } from "react";
import SelectCategory from './SelectCategory';

export default ({ ...props }) => {

		//Here we trigger the flter change like market from BTC to BNB

		//the state for the stateless component is very nice because the task is very simple - only to toggle class
    const { selected, selectFilter, market } = props;
    const [unfold, setUnfold] = useState(false);
    const marketIsSelected = selected.filter === market.name && selected.type === 'pm';

    const toggleUnfold = e => {
        setUnfold(!unfold);
        //Prevent click on the main body to prevent wrong filtering by market
        e.stopPropagation();
    };

    return (
        <div className={`col-${market.categories ? 3 : 2} position-relative`}>
							<div 
								className={`text-center h__cursor_pointer rounded ${marketIsSelected ? 'bg-secondary text-white' : 'h__hover_dark'}`}
								onClick={() => !marketIsSelected && selectFilter('pm', market.name)}
								>
								<span className={market.categories && 'pr-2'}>
									{market.name}
								</span> 
								{ market.categories &&  
									 <span onClick={(e) => toggleUnfold(e) } >
										{unfold ? '⏶' : '⏷'}
										</span>
									}
								</div>
								{	/*If there are subcategories in the market we render the folding list of them */
									market.categories &&
										<div className={`d-${unfold ? 'block' : 'none'} position-absolute h__z-index_1 bg-white`}>
											{market.categories.map(category => <SelectCategory 
												category={category} 
												selected={selected} 
												selectFilter={selectFilter} 
												key={category.name}
											/>)}
										</div>
						
								}
							
					</div>
    )

};