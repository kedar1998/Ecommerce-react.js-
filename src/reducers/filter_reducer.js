import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {

  if(action.type === LOAD_PRODUCTS){
    let maxPrice = action.payload.map((p) => p.price)
    maxPrice = Math.max(...maxPrice)
    return {...state, all_products: [...action.payload], filtered_products:[...action.payload], filters: {...state.filters, max_price: maxPrice, price: maxPrice}}
  }

  if(action.type === SET_GRIDVIEW){
    return {...state, grid_view: true,}
  }

  if(action.type === SET_LISTVIEW){
    return {...state, grid_view: false,}
  }

  if(action.type === UPDATE_SORT){
    return {...state, sort: action.payload}
  }

  if(action.type === SORT_PRODUCTS){

    const {sort, filtered_products} = state
    let tempProducts = [...filtered_products]

    if(sort === 'price-lowest'){
      tempProducts = tempProducts.sort((a,b) => a.price - b.price)
    }

    if(sort === 'price-highest'){
      tempProducts = tempProducts.sort((a,b) => b.price - a.price)
    }

    if(sort === 'name-a'){
      tempProducts = tempProducts.sort((a,b) => {
        return a.name.localeCompare(b.name)
      })
    }

    if(sort === 'name-z'){
      tempProducts = tempProducts.sort((a,b) => {
        return b.name.localeCompare(a.name)
      })
    }

    return {...state, filtered_products: tempProducts}
  }

  if(action.type === UPDATE_FILTERS){
    const {name,value} = action.payload

    return {...state, filters:{...state.filters, [name]: value}}
  }

  if(action.type === FILTER_PRODUCTS){
    const {all_products} = state

    const {text,category,company,color,price,shipping} = state.filters

    let tempProducts = [...all_products]

    // filtering

    // SEARCH
    if(text){
      tempProducts = tempProducts.filter((item) =>{
        return item.name.toLowerCase().startsWith(text)
      })
    }

    // CATEGORY
    if(category !== 'all'){
      tempProducts = tempProducts.filter((item) =>{
        return item.category === category
      })
    }

    // COMPANY
    if(company !== 'all'){
      tempProducts = tempProducts.filter((item) =>{
        return item.company === company
      })
    }

    // COLORS
    if(color !== 'all'){
      tempProducts = tempProducts.filter((item) =>{
        return item.colors.find((c) => c === color)
      })
    }

    //PRICE
    if(price){
      tempProducts = tempProducts.filter((item) =>{
        return item.price <= price
      })
    }

    // SHIPPING
    if(shipping){
      tempProducts = tempProducts.filter((item) =>{
        return item.shipping === true
      })
    }


    return {...state, filtered_products: tempProducts}
  }

  if(action.type === CLEAR_FILTERS){
    return {...state, filters: {
      ...state.filters,
      text: '',
      company: 'all',
      category: 'all',
      color: 'all',
      price: state.filters.max_price,
      shipping: false,
    }}
  }

  // return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
