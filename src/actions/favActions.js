
const toggleFav = (currencyId, on, favs) => {
	 let index = favs.indexOf(currencyId);

	 //Add or remove fav from the array
	 on ? favs.push(currencyId) : favs.splice(index, 1);

   return ({
    type: 'TOGGLE_FAV',
    payload: favs
  })
}

 

export {  toggleFav }