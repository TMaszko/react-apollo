import React from 'react'
import OptionCheckBoxes from './OptionCheckBoxes'
import OneOptionCheckBox from './OneOptionCheckBox'
const SideBarFilterItem = ({keyOfItem, singleValue, ...props}) => {
	return (<li key={`li${keyOfItem}`}>
		<div key={`${keyOfItem}container`} className='col-md-6'>
        {singleValue? <OneOptionCheckBox {...props}/> : <OptionCheckBoxes {...props}/>} 
		</div>
	</li>)
}

export default SideBarFilterItem