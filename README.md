# react-data-table

React data table/grid component with AJAX data loading, pagination and filters

## Installation

`npm install --save git+https://github.com/ilshaiah/react-data-table.git`

## Usage

First, you need import

```js
import DataTable from 'react-data-table';
import 'react-data-table/dist/style.css';
```

As for RTL layout

```js
import DataTable from 'react-data-table';
import 'react-data-table/dist/style-rtl.css';
```

You need to use css loader with webpack. webpack.config.js will contain

```js
...
module.exports = {
    ...
    module: {
        rules: [
        ...
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }]
    ...
    }
```

## Component usage

```js
let filter = {show: true, filterFields: FilterForm};
let heading = {show: true, columns: ['Name', 'Email', 'Phone', 'Gender', '']};
let dataModel = {
    idProperty: "id",
    fields: [
        "name",
        "email",
        "phone",
        "gender",
        "actions"
    ]
};
let actions = {
    'edit': this.edit,
    'delete': this.delete,
};

...

<DataTable filter={filter} heading={heading} actions={actions} dataSource="http://localhost/api_test/data.json" dataModel={dataModel} perPage="10" />
```

## Props:

Props are briefly explained. For more details, please look at the example below

| Property               | Type   | Description                                                                                          |
| :--------------------- | :----- | :--------------------------------------------------------------------------------------------------- |
| dataSource             | string | URL for fetching data                                            |
| perPage                | number | Records per page                                                 |
| filter                 | object | option for setting filters.                                      |
| heading                | object | For setting table header                                         |
| actions                | object | To define actions that wanted to be apply on a record            |
| dataModel              | object | Defines data model structure                                     |
| messages               | object | Texts and messages. This is optional. If you want to change any text just pass an object with any of the texts you want to change. {showing: 'Showing', to: 'to', of: 'of', next: 'Next', previous: 'Previous', current: 'Current', no_records: 'No records found', loading: 'Loading'}        |
| dataParameters         | object | Any parameters or data you want to pass to the server when data-table fetches the data                                                                                     |
| clickableField (default: false) | mixed  | If you want to make any column's text clickable just pass it's name                                                                                                 |

## Example

```js
import React from 'react';
import DataTable from 'react-data-table';
import 'react-data-table/dist/style.css';


// this component renders the filtering fields
class FilterForm extends React.Component{
    render(){
        return (
            <div className="row">
                <div className="col-12 col-md-4">
                    <input type="text" name="name" placeholder="Name" className="form-control" />
                </div>
                
                <div className="col-12 col-md-4">
                    <input type="text" name="email" placeholder="Email" className="form-control" />
                </div>
                
                <div className="col-12 col-md-4">
                    <button type="submit" className="btn">Search</button>&nbsp;&nbsp;
                    <button type="reset" className="btn">Reset</button>
                </div>
            </div>
        );
    }
}


class Table extends React.Component{
    constructor(props){
        super(props);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
    }
    
    render(){
        // To show filters, filterFields is optional if show was set to false
        let filter = {show: true, filterFields: FilterForm};
        // Columns' names. columns is optional if show was set to false
        let heading = {show: true, columns: ['Name', 'Email', 'Phone', 'Gender', '']};
        // idProperty is to tell which is the ID property. This is used for actions (edit/delete...)
        // fields array determines which data will be displayed.  
        let dataModel = {
            idProperty: "id",
            fields: [
                "name",
                "email",
                "phone",
                "gender",
                "actions"
            ]
        };
        /* Determine actions applied on a record. Here we define the action key 'edit' 
        and which function is responsible for that action */
        let actions = {
            'edit': this.edit,
            'delete': this.delete,
        };
        
        return (
            <div className="container" style={{marginTop: '40px'}}>
                <DataTable filter={filter} heading={heading} actions={actions} dataSource="http://localhost/api_test/data.json" dataModel={dataModel} perPage="10" />
            </div>
        );
    }
    
    /* As you see, this is the function which is dedicated for action 'edit'
    ID of the record is passed. Here is where idProperty of the data model becomes handy */
    edit(id){
        window.alert('Editing record with ID: ' + id);
    }
    
    delete(id){
        window.alert('Deleting record with ID: ' + id);
    }
}

export default Table;
```

As for server side implementation and response. Here's an example of the returned JSON

```
{
  "total": 140,
  "data": [{
      "id": 1,
      "name": "Mohammed",
      "email": "mohammed@example.com",
      "phone": "0989789792",
      "gender": "Male",
      "actions": [
        {
          "slug": "edit",
          "title": "Edit",
          "icon": "fa fa-pencil-square-o"
        },
        {
          "slug": "delete",
          "title": "Delete",
          "icon": "fa fa-window-close-o"
        }
      ]
    },{
    ...
```

For pagination DataTable posts two parameters: length, start.

```php
<?php
$length = $_POST['length'];
$start = $_POST['start'];
```

Use DataTable with reference, if you want to use any of these two methods:

```js
reload()

setDataParameters((object) params)
```

## License

MIT