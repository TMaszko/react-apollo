import React, { Component } from 'react'
import QuantityCounter from './QuantityCounter'


class FormState extends Component {
    constructor(props) {
        super(props)
        this.state = {
            quantity: 1
        }
    
    }
    handleIncrement(){
        this.setState({
            quantity: this.state.quantity + 1
        })
    }

    handleDecrement(){
        this.setState({
            quantity: this.state.quantity - 1
        })
    }

    handleAddingToCart(e) {
        e.preventDefault();
        this.props.onAddingCart(this.props.variant.id, this.state.quantity)
    }
    render() {
        return  <form onSubmit={this.handleAddingToCart.bind(this)}> 
                    <QuantityCounter handleIncrement={this.handleIncrement.bind(this)} handleDecrement={this.handleDecrement.bind(this)} quantity={this.state.quantity} />
                    <input type='submit' className="ProductCard__buy button" value="Add to Cart"/>
                </form>
         
    }
}

export default FormState