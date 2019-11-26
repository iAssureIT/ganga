import axios from 'axios';
import $ from 'jquery';

export function getCartData() {

	return dispatch =>{

	$('.fullpageloader').show();

	const userid = localStorage.getItem('user_ID');
    if (userid) {
      return axios.get("/api/carts/get/list/"+userid)
        .then((response)=>{
            $('.fullpageloader').hide();

        		dispatch(fetchcartdata(response.data));
        })
        .catch((error)=>{
              console.log('error', error);
        })
    }
    
    }  
}

export const fetchcartdata = cartdata => ({
    type: 'FETCH_CART_DATA',
    cartData: cartdata
  });

export const searchProductAction = (searchCriteria, searchResult )=> ({
      type: 'SEARCH_PRODUCT',
      searchCriteria: searchCriteria,
      searchResult: searchResult
});