import axios from 'axios';
export function getProductData(data) {
	return dispatch =>{
    return axios.post("/api/products/get/vendorwiselist", data)
    .then((response)=>{
        dispatch(fetchproducts(response.data));
    })
    .catch((error)=>{
          console.log('error', error);
    })
  }  
}
export function getProductCount() {
	return dispatch =>{
    const vendorid = localStorage.getItem('vendor_ID');
    if (vendorid) {
      return axios.get("/api/products/get/vendorwisecount/"+vendorid)
      .then((response)=>{
          dispatch(fetchproductcount(response.data.dataCount));
      })
      .catch((error)=>{
            console.log('error', error);
      })
    }else{
      dispatch(fetchproductcount(0));
    }
  }  
}
export function getFile(data) {
	return dispatch =>{
    return axios.post("/api/products/get/vendorfiles", data)
    .then((response)=>{
        dispatch(fetchfile(response.data));
    })
    .catch((error)=>{
          console.log('error', error);
    })
  }  
}
export function getFileCount() {
	return dispatch =>{
    const vendorid = localStorage.getItem('vendor_ID');
    return axios.get("/api/products/get/vendorfiles/count/"+vendorid)
    .then((response)=>{
      // console.log('getFileCount', response.data)
        dispatch(fetchfilecount(response.data));
    })
    .catch((error)=>{
          console.log('error', error);
    })
  }  
}
export function getProductImage(data) {
	return dispatch =>{
    const vendorid = localStorage.getItem('vendor_ID');
    return axios.post("/api/products/get/vendorwiseimagelist/"+vendorid)
    .then((response)=>{
        dispatch(fetchproductsimage(response.data));
    })
    .catch((error)=>{
          console.log('error', error);
    })
  }  
}
export function getAllOrders(data) {
	return dispatch =>{
    const vendorid = localStorage.getItem('vendor_ID');
    console.log('vendorid',vendorid);
    return axios.post("/api/orders/get/vendorwiselist/"+vendorid, data)
    .then((response)=>{
        dispatch(fetchallorders(response.data));
    })
    .catch((error)=>{
          console.log('getAllOrderserror', error);
    })
  }  
}
export function getAllOrderCount(){
  return dispatch =>{
    const vendorid = localStorage.getItem('vendor_ID');
    return axios.get('/api/orders/get/vendorwisecount/'+vendorid)
    .then((response)=>{
      dispatch(fetchordercount(response.data));
    })
    .catch((error)=>{
      console.log('getAllOrderCounterror', error);
    })
  }
}
export function getOrdersStatus(data) {
	return dispatch =>{
    const vendorid = localStorage.getItem('vendor_ID');
    console.log('vendorid',vendorid);
    return axios.post("/api/orders/get/vendororderstatuslist/"+vendorid, data)
    .then((response)=>{
      console.log('getOrdersStatus', response.data);
        dispatch(fetchorderstatus(response.data));
    })
    .catch((error)=>{
          console.log('getAllOrderserror', error);
    })
  }  
}
export function getOrdersStatusCount(){
  return dispatch =>{
    const vendorid = localStorage.getItem('vendor_ID');
    return axios.get('/api/orders/get/vendorwisecount/'+vendorid)
    .then((response)=>{
      dispatch(fetchorderstatuscount(response.data));
    })
    .catch((error)=>{
      console.log('getAllOrderCounterror', error);
    })
  }
}
export function getReview(data){
  return dispatch =>{
    return axios.post('/api/customerReview/get/vendorwiselist', data)
    .then((response)=>{
      dispatch(fetchreview(response.data));
    })
    .catch((error)=>{
      console.log('getReviewerror', error);
    })
  }
}
export function getReviewCount(){
  const vendorid = localStorage.getItem('vendor_ID');
  return dispatch =>{
    return axios.get('/api/customerReview/get/vendorwisecount/'+vendorid)
    .then((response)=>{
      dispatch(fetchreviewcount(response.data));
    })
    .catch((error)=>{
      console.log('getReviewCounterror', error);
    })
  }
}
export const fetchproducts = recentProductData => ({
  type: 'FETCH_PRODUCTS',
  recentProductData: recentProductData
});
export const fetchproductcount = productCount => ({
  type: 'FETCH_PRODUCTS_COUNT',
  productCount: productCount
});
export const fetchfile = fileData => ({
  type: 'FETCH_FILE',
  fileData: fileData
});
export const fetchfilecount = fileCount => ({
  type: 'FETCH_FILE_COUNT',
  fileCount: fileCount
});
export const fetchproductsimage = productImage => ({
  type: 'FETCH_PRODUCTS_IMAGE',
  productImage: productImage
});
export const fetchallorders = allOrders => ({
  type: 'FETCH_ALL_ORDERS',
  allOrders: allOrders
});
export const fetchordercount = allOrdersCount =>({
  type: 'FETCH_ALL_ORDERS_COUNT',
  allOrdersCount : allOrdersCount
});
export const fetchorderstatus = orderStatus => ({
  type: 'FETCH_ORDERS_STATUS',
  orderStatus: orderStatus
});
export const fetchorderstatuscount = orderStatusCount =>({
  type: 'FETCH_ORDERS_STATUS_COUNT',
  orderStatusCount : orderStatusCount
});
export const fetchreview = review =>({
  type: 'FETCH_REVIEWS',
  review : review
});
export const fetchreviewcount = reviewCount =>({
  type: 'FETCH_REVIEW_COUNT',
  reviewCount : reviewCount
});