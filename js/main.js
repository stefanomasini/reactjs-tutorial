/** @jsx React.DOM */
define(['libreact'], function (React) {
  'use strict';

  var cx = React.addons.classSet;

  var Button = React.createClass({
    onClick: function () {
      this.props.onSelected(this.props.idx);
    },
    render: function () {
      var classes = cx({
        'btn': true,
        'btn-lg': true,
        'btn-default': !this.props.highlighted,
        'btn-primary': this.props.highlighted
      });
      return <button type="button" className={classes} onClick={this.onClick}>{this.props.caption}</button>;
    }
  });

  var skus = [{
    users: 1,
    price: 79
  }, {
    users: 2,
    price: 158
  }, {
    users: 3,
    price: 237
  }, {
    users: 4,
    price: 316
  }];

  var M4DLicenses = React.createClass({
    onSelectedSku: function (e) {
      this.props.onChangedSku(e.target.selectedIndex);
    },
    render: function () {
      var options = skus.map(function (sku, idx) {
        return <option value={idx}>{sku.users} users - ${sku.price}</option>;
      });
      return <div>
        <p>Choose your license:</p>
        <select value={this.props.selectedSku} onChange={this.onSelectedSku}>{options}</select>
      </div>;
    }
  });

  var buttons = [{
    caption: "Mockups for Desktop",
    getView: function (onChangedSku, selectedSku) {
      return <M4DLicenses onChangedSku={onChangedSku} selectedSku={selectedSku}/>;
    }
  }, {
    caption: "myBalsamiq",
    getView: function () {
      return <p>To be implemented</p>;
    }
  }, {
    caption: "Plugin for Google Drive Confluence or Jira",
    getView: function () {
      return <p>To be implemented</p>;
    }
  }];

  var Main = React.createClass({
    getInitialState: function () {
      return {
        selectedProduct: 0,
        selectedSku: 3
      };
    },
    onSelectedProduct: function (idx) {
      this.setState({selectedProduct: idx});
    },
    onChangedSku: function (skuIdx) {
      this.setState({selectedSku: skuIdx});
    },
    render: function () {
      var buttonsMarkup = buttons.map(function (b, idx) {
        return <Button caption={b.caption}
                      highlighted={idx === this.state.selectedProduct}
                      idx={idx}
                      onSelected={this.onSelectedProduct}/>;
      }.bind(this));
      return <div>
        <h1>What version of Mockups are you interested in buying{'?'}</h1>
        {buttonsMarkup}
        {buttons[this.state.selectedProduct].getView(this.onChangedSku, this.state.selectedSku)}
        <p>Total price: ${skus[this.state.selectedSku].price}</p>
      </div>;
    }
  });

  return function () {
    React.renderComponent(
      <Main/>,
      document.getElementById('container')
    );
  };
});
