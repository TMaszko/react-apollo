import React, { Component } from 'react'
import { noDuplicate } from './helper'
import { configFilters } from './configFilters'
import SideBarFiltersList from './SideBarFiltersList'

const SideBarFilter = props => { 
	const filters = configFilters.map(({singleValue, title, nameOfPropertyToCompareWith, pluralForm }) =>{
		return ({ singleValue, title, nameOfPropertyToCompareWith, options: noDuplicate(props[`${pluralForm}`])})})

	return (
		<SideBarFiltersList
			filters={filters}
			onChangeFilter={props.handleFilterChange}/>
	)
}


export default SideBarFilter