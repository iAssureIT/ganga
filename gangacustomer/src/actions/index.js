import axios from 'axios';

export function getCartCata() {

	return dispatch =>{
	

	const userid = localStorage.getItem('user_ID');
    
    return axios.get("/api/carts/get/list/"+userid)
      .then((response)=>{
      		//console.log('response',response.data)
      		dispatch(fetchcartdata(response.data));
      })
      .catch((error)=>{
            console.log('error', error);
      })
    }  
}

export const fetchcartdata = cartdata => ({
    type: 'FETCH_CART_DATA',
    cartData: cartdata
  });


