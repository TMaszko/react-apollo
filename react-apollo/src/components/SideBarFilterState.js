import React, { Component } from 'react'
import SideBarFiltersList from './SideBarFiltersList'

export default class SideBarFilterState extends Component {
	constructor(props) {
		super(props)
		this.state= {}
	}
	render() {
		const filters =[
			{
				title: 'Product type:',
				options: this.props.productsTypes.filter((item, pos) => {
					return this.props.productsTypes.indexOf(item) === pos;
				})
			}
		]
		return (
			<SideBarFiltersList
				filters={filters}
				onChangeFilter={this.props.handleFilterChange}/>
			)
	}
}