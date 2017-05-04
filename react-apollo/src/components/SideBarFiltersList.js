import React from 'react'
import SideBarFilterItem from './SideBarFilterItem'



const SideBarFiltersList = ({filters, onChangeFilter}) => {
	return (
		<ul>
			{filters.map((filter,i) => {
				return	<SideBarFilterItem onChangeFilter={onChangeFilter} key={`filterOf${filter.title}`} keyOfItem={`${filter.title}${i}`} title={filter.title} listOfOptions={filter.options} />
			}
			)}
		</ul>
	)
}



export default SideBarFiltersList;