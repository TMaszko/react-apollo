import React from 'react'
import OptionCheckBoxes from './OptionCheckBoxes'



const handleSingleOption = (checkedOptions, currentValueClicked) => 
							optionName => optionName === currentValueClicked
		 					? 
		 					{checked: !checkedOptions[optionName].checked}
		 					 : 
		 					 {checked: false}

const handleManyOptions = (checkedOptions, currentValueClicked) => 
		 optionName =>  optionName === currentValueClicked? {
		 	checked: !checkedOptions[optionName].checked 
		 }: {checked: checkedOptions[optionName].checked }
const SideBarFilterItem = ({keyOfItem, singleValue, ...props}) => {
	return (<li key={`li${keyOfItem}`}>
		<div key={`${keyOfItem}container`} className='col-md-6'>
        { singleValue? 
          <OptionCheckBoxes onChangeOptions={handleSingleOption} {...props}/>
        : 
        <OptionCheckBoxes onChangeOptions={handleManyOptions} {...props} />
    	} 
		</div>
	</li>)
}

export default SideBarFilterItem