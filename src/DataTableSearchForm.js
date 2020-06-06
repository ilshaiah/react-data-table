import React from 'react';
import jQuery from 'jquery';


class DataTableSearchForm extends React.Component{
	constructor(props){
		super(props);
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onFormReset = this.onFormReset.bind(this);
	}
	
	onFormSubmit(e){
		e.preventDefault();
		this.props.onFilterChange(jQuery(e.target).serializeArray()); /* serialize() */
	}
	
	onFormReset(e){
		this.props.onFilterChange([]);
	}
	
	render(){
		return (
			<form onSubmit={this.onFormSubmit} onReset={this.onFormReset}>
				{this.props.children}
			</form>
		);
	}
}

export default DataTableSearchForm;