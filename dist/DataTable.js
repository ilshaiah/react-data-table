"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _jquery = _interopRequireDefault(require("jquery"));

var _DataTableSearchForm = _interopRequireDefault(require("./DataTableSearchForm"));

var _EmptyRow = _interopRequireDefault(require("./EmptyRow"));

var _BodyRow = _interopRequireDefault(require("./BodyRow"));

var _Pagination = _interopRequireDefault(require("./Pagination"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var DataTable = /*#__PURE__*/function (_React$Component) {
  _inherits(DataTable, _React$Component);

  var _super = _createSuper(DataTable);

  function DataTable(props) {
    var _this;

    _classCallCheck(this, DataTable);

    _this = _super.call(this, props);
    _this.columnsCount = _this.props.heading.columns.length;
    _this.onFilterChange = _this.onFilterChange.bind(_assertThisInitialized(_this));
    _this.callAction = _this.callAction.bind(_assertThisInitialized(_this));
    _this.changeCurrentPage = _this.changeCurrentPage.bind(_assertThisInitialized(_this));
    _this.state = {
      data: [],
      total: 0,
      isLoaded: false,
      currentPage: 1
    };
    _this.isCompMounted = false;
    _this.recordsCount = 0;
    _this.messages = _this.props.messages !== undefined ? _this.props.messages : {};
    _this.messages = _jquery["default"].extend({
      showing: 'Showing',
      to: 'to',
      of: 'of',
      next: 'Next',
      previous: 'Previous',
      current: 'Current',
      no_records: 'No records found',
      loading: 'Loading'
    }, _this.messages);
    _this.perPage = _this.props.perPage;
    _this.filteringCriteria = {};
    _this.dataParameters = _this.props.dataParameters;
    _this.clickableField = _this.props.clickableField !== undefined ? _this.props.clickableField : false;
    return _this;
  }

  _createClass(DataTable, [{
    key: "onFilterChange",
    value: function onFilterChange(data) {
      this.filteringCriteria = data;
      this.loadData();
    }
  }, {
    key: "changeCurrentPage",
    value: function changeCurrentPage(page) {
      this.setState({
        isLoaded: false,
        currentPage: page
      });
      this.loadData();
    }
  }, {
    key: "renderFilterFields",
    value: function renderFilterFields() {
      if (this.props.filter.filterProps !== undefined) {
        return _react["default"].createElement(this.props.filter.filterFields, this.props.filter.filterProps);
      } else {
        return _react["default"].createElement(this.props.filter.filterFields);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("table", {
        className: "table data-table responsive-table"
      }, this.renderHeading(), this.renderBody(), this.renderFooter());
    }
  }, {
    key: "renderHeading",
    value: function renderHeading() {
      if (true === this.props.filter.show || true === this.props.heading.show) {
        var index = 1;
        return /*#__PURE__*/_react["default"].createElement("thead", null, true === this.props.filter.show && /*#__PURE__*/_react["default"].createElement("tr", {
          role: "row",
          className: "filter"
        }, /*#__PURE__*/_react["default"].createElement("td", {
          colSpan: this.columnsCount
        }, /*#__PURE__*/_react["default"].createElement(_DataTableSearchForm["default"], {
          onFilterChange: this.onFilterChange,
          ref: this.filterFormRef
        }, this.renderFilterFields()))), true === this.props.heading.show && /*#__PURE__*/_react["default"].createElement("tr", {
          role: "row",
          className: "heading"
        }, this.props.heading.columns.map(function (col) {
          return /*#__PURE__*/_react["default"].createElement("th", {
            key: index++
          }, col);
        })));
      }
    }
  }, {
    key: "renderBody",
    value: function renderBody() {
      var _this2 = this;

      var rows;

      if (!this.state.isLoaded) {
        rows = /*#__PURE__*/_react["default"].createElement(_EmptyRow["default"], {
          columns: this.columnsCount,
          message: "".concat(this.messages.loading, ".....")
        });
      } else {
        if (this.state.data.length > 0) {
          rows = this.state.data.map(function (rec) {
            return /*#__PURE__*/_react["default"].createElement(_BodyRow["default"], {
              key: rec[_this2.props.dataModel.idProperty],
              data: rec,
              dataModel: _this2.props.dataModel,
              callActionMethod: _this2.callAction,
              headings: _this2.props.heading.columns,
              clickableField: _this2.clickableField
            });
          });
        } else {
          rows = /*#__PURE__*/_react["default"].createElement(_EmptyRow["default"], {
            columns: this.columnsCount,
            message: this.messages.no_records
          });
        }
      }

      return /*#__PURE__*/_react["default"].createElement("tbody", null, rows);
    }
  }, {
    key: "renderFooter",
    value: function renderFooter() {
      if (this.state.total > 0) {
        return /*#__PURE__*/_react["default"].createElement("tfoot", null, /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", {
          colSpan: this.columnsCount
        }, /*#__PURE__*/_react["default"].createElement(_Pagination["default"], {
          onPageRequest: this.changeCurrentPage,
          currentPage: this.state.currentPage,
          perPage: this.perPage,
          total: this.state.total,
          recordsCount: this.state.data.length
        }))));
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.isCompMounted = true;
      this.loadData();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.dataSource != this.props.dataSource || prevProps.dataParameters != this.props.dataParameters) {
        this.dataParameters = this.props.dataParameters;
        this.loadData();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isCompMounted = false;
    }
  }, {
    key: "loadData",
    value: function loadData() {
      var thisObj = this;

      var data = _jquery["default"].extend({
        length: this.perPage,
        start: (this.currentPage - 1) * this.perPage
      }, this.dataParameters);

      var filteringCriteria = this.serializedArrayToObject(this.filteringCriteria);
      data = _objectSpread(_objectSpread({}, data), filteringCriteria);

      _jquery["default"].ajax({
        url: thisObj.props.dataSource,
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        data: data,
        dataType: 'json',
        success: function success(data) {
          if (true === thisObj.isCompMounted) {
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
        error: function error() {
          if (true === thisObj.isCompMounted) {
            window.alert('server connection error');
          }
        }
      });
    }
  }, {
    key: "reload",
    value: function reload() {
      this.loadData();
    }
  }, {
    key: "callAction",
    value: function callAction(slug, id) {
      this.props.actions[slug](id);
    }
  }, {
    key: "serializedArrayToObject",
    value: function serializedArrayToObject(arr) {
      var obj = {};

      for (var i = 0; i < arr.length; i++) {
        obj[arr[i].name] = arr[i].value;
      }

      return obj;
    }
  }, {
    key: "setDataParameters",
    value: function setDataParameters(params) {
      this.dataParameters = params;
    }
  }]);

  return DataTable;
}(_react["default"].Component);

var _default = DataTable;
exports["default"] = _default;