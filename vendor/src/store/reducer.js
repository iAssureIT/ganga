const initialState = {
	productData	 		: [],
	recentProductData  	: [],
	productCount 		: 0,
	fileData 			: [],
	fileCount 			: 0,
	productImage 		: [],
}

const reducer = (state = initialState,action) => {
	const newState = {...state}; 
	
	if(action.type === "FETCH_PRODUCTS"){
		newState.recentProductData = action.recentProductData;
	}
	if(action.type === "FETCH_PRODUCTS_COUNT"){
		newState.productCount = action.productCount;
	}
	if(action.type === "FETCH_FILE"){
		newState.fileData = action.fileData;
	}
	if(action.type === "FETCH_FILE_COUNT"){
		newState.fileCount = action.fileCount;
	}
	if(action.type === "FETCH_PRODUCTS_IMAGE"){
		newState.productImage = action.productImage;
	}
	if(action.type === "FETCH_ALL_ORDERS"){
		newState.allOrders = action.allOrders;
	}
	if(action.type === 'FETCH_ALL_ORDERS_COUNT'){
		newState.allOrdersCount = action.allOrdersCount;
	}
	if(action.type === "FETCH_ORDERS_STATUS"){
		newState.orderStatus = action.orderStatus;
	}
	if(action.type === 'FETCH_ORDERS_STATUS_COUNT'){
		newState.orderStatusCount = action.orderStatusCount;
	}
	return newState;
}

export default reducer;