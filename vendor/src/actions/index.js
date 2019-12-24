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
          console.log('m', response.data)
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