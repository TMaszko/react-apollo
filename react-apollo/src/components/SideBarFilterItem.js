import React from 'react'
import OneOptionCheckBoxes from './OneOptionCheckBoxes'

const SideBarFilterItem = ({keyOfItem,onChangeFilter, title, listOfOptions}) => 
	(<li key={`li${keyOfItem}`}>
		<div key={`${keyOfItem}container`} className='col-md-6'>
        <OneOptionCheckBoxes title={title} onChangeFilter={onChangeFilter} listOfOptions={listOfOptions}/> 
		</div>
	</li>)

export default SideBarFilterItem