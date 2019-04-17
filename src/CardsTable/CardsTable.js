import React from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import './CardsTable.scss';
import axios from 'axios';

class CardsTable extends React.Component {

  state = {items: []};

  componentDidMount() {
    axios.get('https://api.pathoftrade.com/table')
      .then(res => this.formatItems(res.data))
      .catch(err => console.log(err));
  }

  formatItems = items => {
    for (let item of items) {
      if (!item) break; //TODO: remove
      for (let [key, val] of Object.entries(item)) {
        if (key.includes('Ex') || key === 'margin') {
          item[key] = val.toFixed(2);
          if (key === 'margin') {
            item[key] += '%';
          }
        }
        else if (key.includes('Ch')) {
          item[key] = val.toFixed(0);
        }
      }
    }
    var filtered = items.filter((item, index, arr) => item.id >= 0); //TODO: remove
    this.setState({items: filtered});
  } 

  render() {
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
  
    return(
      <div className = "App" >
        <ReactTable data={this.state.items}
          columns={columns}
          sorted={sorted}
          resizable={false}
          minRows={0}
          showPagination={false}
          className='-striped -highlight cards-table' />
      </div>
    ); 
  }
}

export default CardsTable;
