import React from 'react';
import jQuery from 'jquery';
import DataTableSearchForm from './DataTableSearchForm';
import EmptyRow from './EmptyRow';
import BodyRow from './BodyRow';
import Pagination from './Pagination';


class DataTable extends React.Component{
	constructor(props){
		super(props);
		this.columnsCount = this.props.heading.columns.length;
		this.onFilterChange = this.onFilterChange.bind(this);
		this.callAction = this.callAction.bind(this);
		this.changeCurrentPage = this.changeCurrentPage.bind(this);
		this.state = {
			data: [],
			total: 0,
			isLoaded: false,
			currentPage: 1
		};
		this.isCompMounted = false;
		this.recordsCount = 0;
		this.messages = (this.props.messages !== undefined)? this.props.messages : {};
		this.messages = jQuery.extend({
			showing: 'Showing',
			to: 'to',
			of: 'of',
			next: 'Next',
			previous: 'Previous',
			current: 'Current',
			no_records: 'No records found',
			loading: 'Loading'
		}, this.messages);
		this.perPage = this.props.perPage;
		this.filteringCriteria = {};
		this.dataParameters = this.props.dataParameters;
		this.clickableField = (this.props.clickableField !== undefined)? this.props.clickableField : false;
	}
	
	onFilterChange(data){
		this.filteringCriteria = data;
		this.loadData();
	}
	
	changeCurrentPage(page){
		this.setState({
			isLoaded: false,
			currentPage: page
		});
		this.loadData();
	}
	
	renderFilterFields(){
		if(this.props.filter.filterProps !== undefined){
			return React.createElement(this.props.filter.filterFields, this.props.filter.filterProps);
		} else{
			return React.createElement(this.props.filter.filterFields);
		}
	}
	
	render(){
		return (
			<table className="table data-table responsive-table">
				{this.renderHeading()}
				
				{this.renderBody()}
				
				{this.renderFooter()}
			</table>
		);
	}
	
	renderHeading(){
		if(true === this.props.filter.show || true === this.props.heading.show){
			let index = 1;
			return (
				<thead>
					{true === this.props.filter.show &&
						<tr role="row" className="filter">
							<td colSpan={this.columnsCount}>
								<DataTableSearchForm onFilterChange={this.onFilterChange} ref={this.filterFormRef}>
									{this.renderFilterFields()}
								</DataTableSearchForm>
							</td>
						</tr>
					}
					{true === this.props.heading.show &&
						<tr role="row" className="heading">
							{this.props.heading.columns.map((col) =>
								<th key={index++}>{col}</th>
							)}
						</tr>
					}
				</thead>
			);
		}
	}
	
	renderBody(){
		let rows;
		if(!this.state.isLoaded){
			rows = <EmptyRow columns={this.columnsCount} message={`${this.messages.loading}.....`} />
		} else{
			if(this.state.data.length > 0){
				rows = this.state.data.map((rec) =>
					<BodyRow key={rec[this.props.dataModel.idProperty]} data={rec} dataModel={this.props.dataModel} callActionMethod={this.callAction} headings={this.props.heading.columns} clickableField={this.clickableField} />
				);
			} else{
				rows = <EmptyRow columns={this.columnsCount} message={this.messages.no_records} />
			}
		}
		
		return <tbody>{rows}</tbody>;
	}
	
	renderFooter(){
		if(this.state.total > 0){
			return (
				<tfoot>
					<tr>
						<td colSpan={this.columnsCount}>
							<Pagination onPageRequest={this.changeCurrentPage} currentPage={this.state.currentPage} perPage={this.perPage} total={this.state.total} recordsCount={this.state.data.length} messages={this.messages} />
						</td>
					</tr>
				</tfoot>
			);
		}
	}
	
	componentDidMount(){
		this.isCompMounted = true;
		this.loadData();
	}
	
	componentDidUpdate(prevProps, prevState, snapshot){
		if(prevProps.dataSource != this.props.dataSource || prevProps.dataParameters != this.props.dataParameters){
			this.dataParameters =  this.props.dataParameters;
			this.loadData();
		}
	}
	
	componentWillUnmount(){
		this.isCompMounted = false;
	}
	
	loadData(){
		const thisObj = this;
		let data = jQuery.extend({
			length: this.perPage,
			start: ((this.currentPage - 1) * this.perPage)
		}, this.dataParameters);
		
		let filteringCriteria = this.serializedArrayToObject(this.filteringCriteria);
		
		data = {...data, ...filteringCriteria};
		
		jQuery.ajax({
			url: thisObj.props.dataSource,
			method: 'POST',
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			data: data,
			dataType: 'json',
			success: function(data){
				if(true === thisObj.isCompMounted){
					thisObj.recordsCount = data.data.length;
					thisObj.setState({
						isLoaded: false
					});
					thisObj.setState({
						data: data.data,
						total: data.total,
						isLoaded: true
					});
				}
			},
			error: function(){
				if(true === thisObj.isCompMounted){
					window.alert('server connection error');
				}
			}
		});
	}
	
	reload(){
		this.loadData();
	}
	
	callAction(slug, id){
		this.props.actions[slug](id);
	}
	
	serializedArrayToObject(arr){
		let obj = {};
		for(let i = 0; i < arr.length; i++){
			obj[arr[i].name] = arr[i].value;
		}
		
		return obj;
	}
	
	setDataParameters(params){
		this.dataParameters = params;
	}
}

export default DataTable;