import React, { Component } from 'react';
import './App.css';
import ReactTable from "react-table";
import "react-table/react-table.css";

class App extends Component {
  render() {

    const items = [
      {
        id: 0,
        name: 'blah',
        divCard: 'something',
        cardsNeeded: 5,
        pricePerCard: 100,
        totalCardsPrice: 500,
        itemPrice: 600,
        profit: 100,
        profitMargin: "10%"
      },
      {
        id: 1,
        name: 'blah',
        divCard: 'something',
        cardsNeeded: 5,
        pricePerCard: 100,
        totalCardsPrice: 500,
        itemPrice: 600,
        profit: 100,
        profitMargin: "10%"
      },
      {
        id: 2,
        name: 'blah',
        divCard: 'something',
        cardsNeeded: 4,
        pricePerCard: 100,
        totalCardsPrice: 500,
        itemPrice: 600,
        profit: 100,
        profitMargin: "10%"
      },
      {
        id: 3,
        name: 'blah',
        divCard: 'something',
        cardsNeeded: 5,
        pricePerCard: 100,
        totalCardsPrice: 500,
        itemPrice: 600,
        profit: 100,
        profitMargin: "10%"
      }
    ];

    const columns = [
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Div Card',
        accessor: 'divCard'
      },
      {
        Header: 'Cards Needed',
        accessor: 'cardsNeeded'
      },
      {
        Header: 'Price Per Card',
        accessor: 'pricePerCard'
      },
      {
        Header: 'Total Cards Price',
        accessor: 'totalCardsPrice'
      },
      {
        Header: 'Item Price',
        accessor: 'itemPrice'
      },
      {
        Header: 'Profit',
        accessor: 'profit'
      },
      {
        Header: 'Profit Margin',
        accessor: 'profitMargin'
      },
    ];

    return (
      <div className="App">
        <ReactTable data={items} columns={columns} className='-striped'/>
      </div>
    );
  }
}

export default App;
