import React from 'react';


class EmptyRow extends React.Component{
	render(){
		return (
		<tr>
			<td colSpan={this.props.columns}>{this.props.message}</td>
		</tr>
		);
	}
}

export default EmptyRow;