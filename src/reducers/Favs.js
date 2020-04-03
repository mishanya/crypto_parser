

export default function favsReducer( state = [], action) {
  let {payload} = action;
  console.log(action)
  switch (action.type ){
    case 'TOGGLE_FAV':
      return payload
      break
  
    default:
      return state
      break
  }
}
