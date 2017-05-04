import React from 'react'



const SideBarFilterItem = ({keyOfItem,onChangeFilter, title, listOfOptions}) => 
	(<li key={`li${keyOfItem}`}>
		<div key={`${keyOfItem}container`} className='col-md-8'>
			<h5>{title}</h5>
			<select
        className="Product__option"
        name={title}
        key={`select${keyOfItem}${title}`}
        onChange={onChangeFilter}
        >
        {listOfOptions.map((value) => {
          return (
            <option value={value} key={`option${title}-${value}`}>{`${value}`}</option>
          )
        })}
      </select>
		</div>
	</li>)

export default SideBarFilterItem