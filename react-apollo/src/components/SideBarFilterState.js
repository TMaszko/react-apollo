import React, { Component } from 'react'
import SideBarFiltersList from './SideBarFiltersList'

export default class SideBarFilterState extends Component {
	constructor(props) {
		super(props)
		this.state= {}
	}

	handleChangeFilter(item) {


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
		console.log(filters[0].options)
		return (
			<SideBarFiltersList
				filters={filters}
				onChangeFilter={this.handleChangeFilter.bind(this)}/>
			)
	}
}