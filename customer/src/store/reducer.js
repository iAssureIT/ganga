const initialState = {
	cartCount	 	: 0,
	wishlistCount 	: 0,
	featuredProductData : {},
	exclusiveProductsData : [],
	newProductsData : [],
	bestSellerData : []
}

const reducer = (state = initialState,action) => {
	const newState = {...state};
	if(action.type === "CART_COUNT_INITIALLY"){
		newState.cartCount 		= action.cartCount;
	}
	if(action.type === "CART_COUNT"){
		newState.cartCount 		= action.cartCount;
	}
	if(action.type === "WISHLIST_COUNT_INITIALLY"){
		newState.wishlistCount 		= action.wishlistCount;
	}
	if(action.type === "WISHLIST_COUNT"){
		newState.wishlistCount 		= action.wishlistCount;
	}
	if(action.type === "FEATURED_PRODUCT_DATA"){
		newState.featuredProductData 		= action.featuredProductData;
	}
	return newState;
}

export default reducer;