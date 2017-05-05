import React, { Component } from 'react'

const toCamelCase =  (str) => str
        .replace(/\s(.)/g, $1 => $1.toUpperCase())
        .replace(/\s/g, '')
        .replace(/^(.)/, $1 => $1.toLowerCase())
        .replace(/:/g,'');

export default class  OneOptionCheckBoxes extends Component {
	constructor(props) {
		super(props)
		this.state = {
			checkedOption:"default"
		}
	}

	onChangeOption(e) {
		const currentOption = {
			checked: e.target.checked,
			value: e.target.value
		}
			this.setState({
				checkedOption: this.state.checkedOption.value === currentOption.value
				? {	
					value: currentOption.value = '',
					checked: !this.state.checkedOption.checked
				}
				:
				  {
				  	...currentOption
				  }
			})
		const title = toCamelCase(this.props.title);
		this.props.onChangeFilter(title, [currentOption.value]);	
	}


	render() {
		return (
		<div>
			<h5>{this.props.title}</h5>
		   		{this.props.listOfOptions.map((value) => 
          		<label key={`label${this.props.title}-${value}`} className="col-md-12">
		            <input type="checkbox" checked={value === this.state.checkedOption.value} onChange={this.onChangeOption.bind(this)} value={`${value}`} key={`checkbox${this.props.title}-${value}`}/>
		                {value}
	          	</label>
	          	)}
        </div>
        ) 
	}


}