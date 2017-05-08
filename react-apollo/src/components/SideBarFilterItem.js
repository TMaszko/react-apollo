import React from 'react'
import OptionCheckBoxes from './OptionCheckBoxes'

const SideBarFilterItem = ({keyOfItem,onChangeFilter, title, listOfOptions}) => 
	(<li key={`li${keyOfItem}`}>
		<div key={`${keyOfItem}container`} className='col-md-6'>
        <OptionCheckBoxes title={title} onChangeFilter={onChangeFilter} listOfOptions={listOfOptions}/> 
		</div>
	</li>)

export default SideBarFilterItem