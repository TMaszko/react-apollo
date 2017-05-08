import React,{Component} from 'react'

export default class  OptionCheckBoxes extends Component {
	constructor(props) {
		super(props)
		let options ={};
		this.props.listOfOptions.forEach( option => options[option] = {checked:false})
		this.state = {
			checkedOptions: options
		}

	}

	onChangeOption(e) {

		const currentOption = {
			value: e.target.value
		}
		const isChecked = this.state.checkedOptions[currentOption.value].checked;
		const updatedState = { 
								checkedOptions:{ 
									...this.state.checkedOptions, 
									[currentOption.value]: {checked: !isChecked}
								}
							}

		this.setState(updatedState)
		const checkedOptionsArray = Object.keys(updatedState.checkedOptions).filter(option => updatedState.checkedOptions[option].checked)
		this.props.onChangeFilter(this.props.nameOfPropertyToCompareWith, checkedOptionsArray);	
	}


	render() {

		return (
		<div>
			<h5>{this.props.title}</h5>
		   		{this.props.listOfOptions.map((value) => 
          		<label key={`label${this.props.nameOfPropertyToCompareWith}-${value}`} className="col-md-12">
		            <input type="checkbox" checked={this.state.checkedOptions[value].checked} onChange={this.onChangeOption.bind(this)} value={`${value}`} key={`checkbox${this.props.nameOfPropertyToCompareWith}-${value}`}/>
		                {value}
	          	</label>
	          	)}
        </div>
        ) 
	}
}