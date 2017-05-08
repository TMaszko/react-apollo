import React, { Component } from 'react'
import { objectMap } from './helper'

export default class OneOptionCheckBox extends Component {
	constructor(props) {
		super(props)
		let options ={};
		this.props.listOfOptions.forEach( option => options[option] = {checked:false})
		this.state = {
			checkedOptions:options
		}
	}

	onChangeOption(e) {
		const currentOption = {
			value: e.target.value
		}
		let updatedState = {
				checkedOptions: {}
			}
		objectMap(this.state.checkedOptions,
		this.props.onChangeOptions(this.state.checkedOptions, currentOption.value), updatedState.checkedOptions);
		
		this.setState(updatedState)
		console.log(updatedState)
		const checkedOptionsArray = Object.keys(updatedState.checkedOptions).filter(option => updatedState.checkedOptions[option].checked)
		this.props.onChangeFilter(this.props.nameOfPropertyToCompareWith, checkedOptionsArray);	
	}


	render() {
		return (
		<div>
			<h5>{this.props.title}</h5>
		   		{this.props.listOfOptions.map((value) => 
          		<label key={`label${this.props.title}-${value}`} className="col-md-12">
		            <input type="checkbox" checked={this.state.checkedOptions[value].checked} name={`checkbox${this.props.nameOfPropertyToCompareWith}`} onChange={this.onChangeOption.bind(this)} value={`${value}`} key={`checkbox${this.props.nameOfPropertyToCompareWith}-${value}`}/>
		                {value}
	          	</label>
	          	)}
        </div>
        ) 
	}
}