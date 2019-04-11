import React from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import './CardsTable.scss';

const CardsTable = (props) => {
  const items = [
    {
      name: 'Mirror of Kalandra',
      card: 'House Of Mirrors',
      stack: 9,
      cardPriceCh: 1165,
      cardPriceEx: 9,
      stackPriceCh: 10485,
      stackPriceEx: 87,
      itemPriceCh: 11600,
      itemPriceEx: 96,
      profitCh: 1115,
      profitEx: 9,
      margin: "9.61%"
    },
    {
      name: 'Mirror of Kalandra',
      card: 'House Of Mirrors',
      stack: 9,
      cardPriceCh: 1165,
      cardPriceEx: 9,
      stackPriceCh: 10485,
      stackPriceEx: 87,
      itemPriceCh: 11600,
      itemPriceEx: 96,
      profitCh: 1115,
      profitEx: 9,
      margin: "9.61%"
    },
    {
      name: 'Mirror of Kalandra',
      card: 'House Of Mirrors',
      stack: 9,
      cardPriceCh: 1165,
      cardPriceEx: 9,
      stackPriceCh: 10485,
      stackPriceEx: 87,
      itemPriceCh: 11600,
      itemPriceEx: 96,
      profitCh: 1115,
      profitEx: 9,
      margin: "9.61%"
    },
    {
      name: 'Mirror of Kalandra',
      card: 'House Of Mirrors',
      stack: 9,
      cardPriceCh: 1165,
      cardPriceEx: 9,
      stackPriceCh: 10485,
      stackPriceEx: 87,
      itemPriceCh: 11600,
      itemPriceEx: 96,
      profitCh: 1115,
      profitEx: 9,
      margin: "9.61%"
    }
  ];

  const chaosImage = <img className='cards-table__currency-icon' src={process.env.PUBLIC_URL + 'images/chaos.png'} alt='chaos' />;
  const exaltedImage = <img className='cards-table__currency-icon' src={process.env.PUBLIC_URL + 'images/exalted.png'} alt='exalted' />;
  const columns = [
    {
      Header: 'Item',
      accessor: 'name',
      minWidth: 140,
    },
    {
      Header: 'Card',
      accessor: 'card',
      minWidth: 140,
    },
    {
      Header: 'Card Price',
      columns: [
        {
          Header: props => chaosImage,
          accessor: 'cardPriceCh',
          minWidth: 60,
          className: 'cards-table__price'
        },
        {
          Header: props => exaltedImage,
          accessor: 'cardPriceEx',
          minWidth: 60,
          className: 'cards-table__price'
        },
      ]
    },
    {
      Header: 'Stack Price',
      columns: [
        {
          Header: props => chaosImage,
          accessor: 'stackPriceCh',
          minWidth: 60,
          className: 'cards-table__price'
        },
        {
          Header: props => exaltedImage,
          accessor: 'stackPriceEx',
          minWidth: 60,
          className: 'cards-table__price'
        },
      ]
    },
    {
      Header: 'Item Price',
      columns: [
        {
          Header: props => chaosImage,
          accessor: 'itemPriceCh',
          minWidth: 60,
          className: 'cards-table__price'
        },
        {
          Header: props => exaltedImage,
          accessor: 'itemPriceEx',
          minWidth: 60,
          className: 'cards-table__price'
        },
      ]
    },
    {
      Header: 'Profit',
      columns: [
        {
          Header: props => chaosImage,
          accessor: 'profitCh',
          minWidth: 60,
          className: 'cards-table__price'
        },
        {
          Header: props => exaltedImage,
          accessor: 'profitEx',
          minWidth: 60,
          className: 'cards-table__price'
        },
      ]
    },
    {
      Header: 'Margin',
      accessor: 'margin',
      minWidth: 60,
      className: 'cards-table__margin'
    },
  ];

  const sorted = [
    {
      id: 'cardPriceCh',
      desc: true
    }
  ];

  return (
    <div className="App">
      <ReactTable data={items}
        columns={columns}
        sorted={sorted}
        resizable={false}
        minRows={0}
        showPagination={false}
        className='-striped -highlight cards-table' />
    </div>
  );
}

export default CardsTable;
