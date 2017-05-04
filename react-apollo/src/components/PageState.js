import React, { Component } from 'react'
import ProductCard from './ProductCard'
import Pagination from 'react-js-pagination'


export default class PageState extends Component {
	constructor(props) {
		super(props)
		this.state = {
			activePage: 1
		}
	}
	handlePageChange(pageNumber) {
	    console.log(`active page is ${pageNumber}`);
	    this.setState({activePage: pageNumber});
  	}
  	render() {
  		const productCardView = product => (
  		<ProductCard 
          addVariantToCart={this.props.addVariantToCart}
          checkout={this.props.checkout} 
          key={product.node.id.toString()} 
          product={product.node}/> 
        )
  		return (
  			<div className="container col-md-12">
	  			<div className="container col-md-offset-3 col-md-9">
	          		{this.props.products.map(productCardView)}
	        	</div>
	        	<footer>
	        		<Pagination
	        			activePage={this.state.activePage}
	        			itemsCountPerPage={9}
	        			totalItemsCount={this.props.totalItemsCount}
	        			onChange={this.handlePageChange.bind(this)} />
	        	</footer>
	  		</div>
  		)
  	}	
}