import React, { Component } from 'react'
import ProductCard from './ProductCard'


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
  		
	  			
  		)
  	}	
}