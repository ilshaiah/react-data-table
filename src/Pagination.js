import React from 'react';


class Pagination extends React.Component{
	render(){
		if(this.props.total > 0){
			let from = ((this.props.currentPage - 1) * this.props.perPage) + 1;
			let to = from + this.props.recordsCount - 1;
			let pages = Math.ceil(this.props.total / this.props.perPage);
			let previous, next;
			let items = [];
			let details = this.props.messages.showing + ' ' + from + ' ' + this.props.messages.to + ' ' + to + ' ' + this.props.messages.of + ' ' + this.props.total;
			
			let itemsArray = [{number: this.props.currentPage, text: this.props.currentPage}];
			if(this.props.currentPage > 1){
				itemsArray.unshift({number: this.props.currentPage - 1, text: this.props.currentPage - 1});
				
				if(this.props.currentPage - 3 >= 1){
					itemsArray.unshift({number: this.props.currentPage - 3, text: '...'});
				}
				else if(this.props.currentPage - 2 == 1){
					itemsArray.unshift({number: this.props.currentPage - 2, text: this.props.currentPage - 2});
				}
			}
			
			if(this.props.currentPage < pages){
				itemsArray.push({number: this.props.currentPage + 1, text: this.props.currentPage + 1});
				
				if(pages >= this.props.currentPage + 3){
					itemsArray.push({number: this.props.currentPage + 3, text: '...'});
				}
				else if(this.props.currentPage + 2 == pages){
					itemsArray.push({number: this.props.currentPage + 2, text: this.props.currentPage + 2});
				}
			}
			
			if(this.props.currentPage > 1){
				let pageNum = this.props.currentPage - 1;
				let key = 'item-previous-' + pageNum;
				previous = <li className="page-item" key={key}>
					<a className="page-link" href="javascript:void(0)" onClick={this.changeCurrentPage.bind(this, pageNum)} aria-label={this.props.messages.previous}>
						&lt;<span className="sr-only">{this.props.messages.previous}</span>
					</a>
				</li>
			} else{
				let key = 'item-previous-disabled';
				previous = <li className="page-item disabled" key={key} tabIndex="-1" aria-disabled="true">
					<a className="page-link" href="javascript:void(0)" tabIndex="-1" aria-label={this.props.messages.previous} aria-disabled="true">
						&lt;
					</a>
				</li>
			}
			
			for(var i = 0; i < itemsArray.length; i++){
				if(this.props.currentPage == itemsArray[i].number){
					let key = 'item-current-' + itemsArray[i].number;
					items[items.length] = <li className="page-item active" aria-current="page" key={itemsArray[i].number}>
						<span className="page-link">{itemsArray[i].text}<span className="sr-only">({this.props.messages.current})</span></span>
					</li>
				} else{
					let key = 'item-' + itemsArray[i].number;
					items[items.length] = <li className="page-item" key={itemsArray[i].number}>
						<a className="page-link" href="javascript:void(0)" onClick={this.changeCurrentPage.bind(this, itemsArray[i].number)}>{itemsArray[i].text}</a>
					</li>
				}
			}
			
			if(this.props.currentPage < pages){
				let pageNum = this.props.currentPage + 1;
				let key = 'item-next-' + pageNum;
				next = <li className="page-item" key={key}>
					<a className="page-link" href="javascript:void(0)" onClick={this.changeCurrentPage.bind(this, pageNum)} aria-label={this.props.messages.next}>
						&gt;<span className="sr-only">{this.props.messages.next}</span>
					</a>
				</li>
			} else{
				let key = 'item-next-disabled';
				next = <li className="page-item disabled" key={key} tabIndex="-1" aria-disabled="true">
					<a className="page-link" href="javascript:void(0)" tabIndex="-1" aria-label={this.props.messages.next} aria-disabled="true">
						&gt;
					</a>
				</li>
			}
			
			return (
				<nav className="table-pagination-wrapper" aria-label="Pagination">
					<ul className="table-pagination">
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
			);
		} else{
			return '';
		}
	}
	
	changeCurrentPage(page){
		this.props.onPageRequest(page);
	}
}

export default Pagination;