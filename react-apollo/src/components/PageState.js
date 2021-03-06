import React, { Component } from 'react'
import ProductCard from './ProductCard'
import { flatArray } from './helper'
import SideBarFilter from './SideBarFilter'
import Pagination from 'react-js-pagination'


const filteredProductsCardsView = (products, filters, changed) => {
	return products.filter(product => {
			for(let filterOption in filters) {
					if(filters.hasOwnProperty(filterOption)) {
						let passedFilters = filters[filterOption].values.length <= 0?
						true : 
						filters[filterOption].values
						.some(valueOfFilter => {
							return flatArray([product.node[filterOption]])				//one option will be [1]
								.some(valueInProduct => valueOfFilter === valueInProduct)
						});
						if(!passedFilters) {
							return false;
						}
					}		
				}			
			return true;
		})
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
				        				
		const productsTags = flatArray(this.props.products.map(product => product.node.tags));		        			
  		const productsVendors=this.props.products.map(product => product.node.vendor)
        const productsTypes= this.props.products.map(product => product.node.productType);
  		return (
  			<div className="container col-md-12">
  				<div className="SideBarFilter col-md-3">
	        		<SideBarFilter handleFilterChange={this.handleFilterChange.bind(this)} tags={productsTags} vendors={productsVendors} productsTypes={productsTypes} />
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