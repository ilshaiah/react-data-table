import React from 'react';
import jQuery from 'jquery';
import { Link } from 'react-router-dom';


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
				tds[tds.length] = <td key={this.props.dataModel.fields[i]} data-label="Actions" className="actions">
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

export default BodyRow;