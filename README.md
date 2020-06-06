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

