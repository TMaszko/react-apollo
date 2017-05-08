import React, { Component } from 'react'
import { toCamelCase } from './helper'

export default class OneOptionCheckBox extends Component {
	constructor(props) {
		super(props)
		let options ={};
		this.state = {
			checkedOptions: {
				value: '',
				checked: false
			}
		}

	}

	onChangeOption(e) {
		const currentOption = {
			value: e.target.value
		}
		const updatedState = { 
								checkedOptions:{ 
										value: this.state.checkedOptions.value === currentOption.value ? currentOption.value = '': currentOption.value,
										checked: !this.state.checkedOptions.checked
								}
							}

		this.setState(updatedState)
		const checkedOptionsArray = currentOption.value === '' ? []: [currentOption.value];
		this.props.onChangeFilter(this.props.nameOfPropertyToCompareWith, checkedOptionsArray);	
	}


	render() {
		return (
		<div>
			<h5>{this.props.title}</h5>
		   		{this.props.listOfOptions.map((value) => 
          		<label key={`label${this.props.title}-${value}`} className="col-md-12">
		            <input type="checkbox" checked={this.state.checkedOptions.value === value} name={`checkbox${this.props.nameOfPropertyToCompareWith}`} onChange={this.onChangeOption.bind(this)} value={`${value}`} key={`checkbox${this.props.nameOfPropertyToCompareWith}-${value}`}/>
		                {value}
	          	</label>
	          	)}
        </div>
        ) 
	}
}