import React from 'react';
import jQuery from 'jquery';
import { Link } from 'react-router-dom';


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


class EmptyRow extends React.Component{
	render(){
		return (
		<tr>
			<td colSpan={this.props.columns}>{this.props.message}</td>
		</tr>
		);
	}
}


class BodyRow extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data: props.data
		}
	}
	
	renderRowActions(actions){
		return (
			<React.Fragment>
				{actions.map((act) => {
					let text = (act.icon != '')? (<i className={act.icon}></i>) : act.title;
					
					if(act.link !== undefined && act.link != ''){
						return (
								<Link key={act.slug} to={act.link} title={act.title}>
									{text}
								</Link>
							);
					} else{
						return (
							<a key={act.slug} href="javascript:void(0)" onClick={this.callAction.bind(this, act.slug)} title={act.title}>
								{text}
							</a>
						);
					}
				})}
			</React.Fragment>
		);
	}
	
	callAction(slug){
		this.props.callActionMethod(slug, this.state.data[this.props.dataModel.idProperty]);
	}
	
	render(){
		let tds = [];
		for(let i = 0; i < this.props.dataModel.fields.length; i++){
			let label = (this.props.headings[i] !== undefined)? this.props.headings[i] : '';
			
			if('actions' == this.props.dataModel.fields[i]){
				tds[tds.length] = <td key={this.props.dataModel.fields[i]} data-label={translations.front.actions} className="actions">
					{this.renderRowActions(this.state.data[this.props.dataModel.fields[i]])}
				</td>
			} else{
				if(this.props.clickableField !== false && this.props.clickableField.field == this.props.dataModel.fields[i]){
					tds[tds.length] = (
						<td key={this.props.dataModel.fields[i]} data-label={label}>
							<Link to={this.state.data.actions[this.props.clickableField.actionIndex].link} title={this.state.data.actions[this.props.clickableField.actionIndex].title}>
								{this.state.data[this.props.dataModel.fields[i]]}
							</Link>
						</td>
					);
				} else{
					tds[tds.length] = <td key={this.props.dataModel.fields[i]} data-label={label} dangerouslySetInnerHTML={{__html: this.state.data[this.props.dataModel.fields[i]]}}></td>
				}
			}
		}
		
		return (
			<tr>
				{tds}
			</tr>
		);
	}
	
	componentDidMount(){
		jQuery('.no-padding-for-parent').parent('td').css('padding-top', '0').css('padding-bottom', '0');
	}
}


class DataTable extends React.Component{
	constructor(props){
		super(props);
		this.columnsCount = this.props.heading.columns.length;
		this.onFilterChange = this.onFilterChange.bind(this);
		this.callAction = this.callAction.bind(this);
		this.state = {
			data: [],
			total: 0,
			isLoaded: false
		};
		this.currentPage = 1;
		this.isCompMounted = false;
		this.recordsCount = 0;
		this.messages = jQuery.extend({
			showing: translations.front.showing,
			to: translations.front.to,
			of: translations.front.of,
			next: translations.front.next,
			previous: translations.front.previous,
			current: translations.front.current,
			no_records: translations.front.no_records_found,
			loading: translations.front.loading
		}, this.props.messages);
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
		this.currentPage = page;
		this.setState({
			isLoaded: false
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
			let from = ((this.currentPage - 1) * this.perPage) + 1;
			let to = from + this.recordsCount - 1;
			let pages = Math.ceil(this.state.total / this.perPage);
			let previous, next;
			let items = [];
			let details = this.messages.showing + ' ' + from + ' ' + this.messages.to + ' ' + to + ' ' + this.messages.of + ' ' + this.state.total;
			
			if(this.currentPage > 1){
				let pageNum = this.currentPage - 1;
				let key = 'item-previous-' + pageNum;
				previous = <li className="page-item" key={key}>
					<a className="page-link" href="javascript:void(0)" onClick={this.changeCurrentPage.bind(this, pageNum)} aria-label={this.messages.previous}>
						<i className="fa fa-angle-left" aria-hidden="true"></i><span className="sr-only">{this.messages.previous}</span>
					</a>
				</li>
			} else{
				let key = 'item-previous-disabled';
				previous = <li className="page-item disabled" key={key} tabIndex="-1" aria-disabled="true">
					<a className="page-link" href="javascript:void(0)" tabIndex="-1" aria-label={this.messages.previous} aria-disabled="true">
						<i className="fa fa-angle-left" aria-hidden="true"></i>
					</a>
				</li>
			}
			
			for(var i = 1; i <= pages; i++){
				if(this.currentPage == i){
					let key = 'item-current-' + i;
					items[items.length] = <li className="page-item active" aria-current="page" key={key}>
						<span className="page-link">{i}<span className="sr-only">({this.messages.current})</span></span>
					</li>
				} else{
					let key = 'item-' + i;
					items[items.length] = <li className="page-item" key={key}>
						<a className="page-link" href="javascript:void(0)" onClick={this.changeCurrentPage.bind(this, i)}>{i}</a>
					</li>
				}
			}
			
			if(this.currentPage < pages){
				let pageNum = this.currentPage + 1;
				let key = 'item-next-' + pageNum;
				next = <li className="page-item" key={key}>
					<a className="page-link" href="javascript:void(0)" onClick={this.changeCurrentPage.bind(this, pageNum)} aria-label={this.messages.next}>
						<i className="fa fa-angle-right" aria-hidden="true"></i><span className="sr-only">{this.messages.next}</span>
					</a>
				</li>
			} else{
				let key = 'item-next-disabled';
				next = <li className="page-item disabled" key={key} tabIndex="-1" aria-disabled="true">
					<a className="page-link" href="javascript:void(0)" tabIndex="-1" aria-label={this.messages.next} aria-disabled="true">
						<i className="fa fa-angle-right" aria-hidden="true"></i>
					</a>
				</li>
			}
			
			return (
				<tfoot>
					<tr>
						<td colSpan={this.columnsCount}>
							<nav className="list-pagination-wrapper clear-fix" aria-label="Pagination">
								<ul className="pagination">
									{previous}
									
									{items}
									
									{next}
								</ul>
								
								<div className="pages-details-wrapper">
									<div className="pages-details">
										{details}
									</div>
								</div>
							</nav>
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