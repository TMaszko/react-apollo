import React from 'react'
import SideBarFilterItem from './SideBarFilterItem'



const SideBarFiltersList = ({filters, onChangeFilter}) => {
	return (
		<ul>
			{filters.map((filter,i) => 
				<SideBarFilterItem 
					onChangeFilter={onChangeFilter} 
					key={`filterOf${filter.nameOfPropertyToCompareWith}`}
					keyOfItem={`${filter.nameOfPropertyToCompareWith}${i}`} 
					nameOfPropertyToCompareWith={filter.nameOfPropertyToCompareWith}
					title={filter.title}
					listOfOptions={filter.options}
					singleValue={filter.singleValue} />
			)}
		</ul>
	)
}



export default SideBarFiltersList;