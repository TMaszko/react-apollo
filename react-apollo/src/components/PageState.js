import React, { Component } from 'react'
import ProductCard from './ProductCard'
import SideBarFilterState from './SideBarFilterState'
import Pagination from 'react-js-pagination'


const filteredProductsCardsView = (products, filters, startFilterTitle= "productType") => {
	return products.filter(product => {
		let index = Object.keys(filters).indexOf(startFilterTitle);
		console.log(index)
		console.log('TAGS: ', product.node.tags)
		console.log('Vendor',product.node.vendor)
		let counter = 0;
			for(let filterOption in filters) {
				if(index <= counter) {
					if(filters.hasOwnProperty(filterOption)) {
						let passedFilters = 
						filters[filterOption].values.length <= 0? true : 
						filters[filterOption].values.some(valueOfFilter =>{
						 return [product.node[filterOption]].reduce((acc,curr) => acc.concat(curr),[])
														.some(valueInProduct => { 
															return valueOfFilter === valueInProduct
														})
													}
														);
						if(!passedFilters) {
							return false;
						}
						counter++			
					}
				}
					
			}
			return true;
		}
	)
}




export default class PageState extends Component {
	constructor(props) {
		super(props)
		this.state = {
			changed:"",
			activePage: 1,
			activeFilters: {}
		}
	}
	handleFilterChange(title, filtersOptions) {
			this.setState({
				changed:title,
				activeFilters: {
					...this.state.activeFilters,
					[title]: {
						values: filtersOptions 
					}  
				},
				activePage: 1
			}
		)

      
  	}
	handlePageChange(pageNumber) {
	    console.log(`active page is ${pageNumber}`);
	    this.setState({
	    	...this.state,
	    	activePage: pageNumber
	    });
  	}
  	render() {
  		 const filteredArray = filteredProductsCardsView(this.props.products,this.state.activeFilters,this.state.changed);
  		let activePage = this.state.activePage;
  		let productsCardsView = filteredArray
  									.slice((activePage-1)*9,((activePage-1)*9)+9)
  										.map(product => 
				  						(
						  				<ProductCard 
						          			addVariantToCart={this.props.addVariantToCart}
						          			checkout={this.props.checkout} 
						          			key={product.node.id.toString()} 
						          			product={product.node}/> 
				        				))
		const productsTags = this.props.products.map(product => product.node.tags).reduce((acc,curr) => acc.concat(curr),[]);		        			
  		const productsVendors=this.props.products.map(product => product.node.vendor)
        const productsTypes= this.props.products.map(product => product.node.productType);
  		return (
  			<div className="container col-md-12">
  				<div className="SideBarFilter col-md-3">
	        		<SideBarFilterState handleFilterChange={this.handleFilterChange.bind(this)} productsTags={productsTags} productsVendors={productsVendors} productsTypes={productsTypes} />
	        	</div>
	  			<div className="Product-wrapper col-md-9">
	          		{productsCardsView}
	        	</div>
	        	<footer className="col-md-12">
	        		<Pagination
	        			activePage={this.state.activePage}
	        			itemsCountPerPage={9}
	        			totalItemsCount={filteredArray.length}
	        			onChange={this.handlePageChange.bind(this)} />
	        	</footer>
	  		</div>
  		)
  	}	
}