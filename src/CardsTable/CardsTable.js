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
      if (!item) continue; //TODO: remove

      for (let [key, val] of Object.entries(item)) {
        if (key.includes('Ex') || key === 'margin') {
          item[key] = +val.toFixed(2);
          if (key === 'margin') {
            item[key] += '%';
          }
        }
        else if (key.includes('Ch')) {
          item[key] = +val.toFixed(0);
        }
      }

      item.stackPriceCh = item.cardPriceCh * item.stack;
      item.stackPriceEx = +(item.cardPriceEx * item.stack).toFixed(2);
      item.profitCh = item.itemPriceCh - item.stackPriceCh;
      item.profitEx = +(item.itemPriceEx - item.stackPriceEx).toFixed(2);
      item.margin = +(item.profitCh / item.itemPriceCh).toFixed(2);
    }
    var filtered = items.filter((item, index, arr) => item.id >= 0); //TODO: remove
    this.setState({items: filtered});
  } 

  render() {
    const chaosImage = <img className='cards-table__currency-icon' src={process.env.PUBLIC_URL + 'images/chaos.png'} alt='chaos' />;
    const exaltedImage = <img className='cards-table__currency-icon' src={process.env.PUBLIC_URL + 'images/exalted.png'} alt='exalted' />;
    const searchBtn = <button className='cards-table__search-btn'>
      <img className='cards-table__search-icon' alt='search on pathofexile.com' src='/images/search.svg' />
      </button>;
    const columns = [
      {
        Header: 'Card',
        accessor: 'card',
        minWidth: 180,
      },
      {
        Header: 'Item',
        accessor: 'name',
        minWidth: 140,
      },
      {
        Header: 'Stack',
        accessor: 'stack',
        minWidth: 60,
        className: 'cards-table__stack'
      },
      {
        Header: 'Card Price',
        columns: [
          {
            Header: props => chaosImage,
            accessor: 'cardPriceCh',
            minWidth: 60,
            headerClassName: 'cards-table__ch-column',
            className: 'cards-table__price cards-table__price_ch'
          },
          {
            Header: props => exaltedImage,
            accessor: 'cardPriceEx',
            minWidth: 60,
            headerClassName: 'cards-table__ex-column',
            className: 'cards-table__price cards-table__price_ex'
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
            headerClassName: 'cards-table__ch-column',
            className: 'cards-table__price cards-table__price_ch'
          },
          {
            Header: props => exaltedImage,
            accessor: 'stackPriceEx',
            minWidth: 60,
            headerClassName: 'cards-table__ex-column',
            className: 'cards-table__price cards-table__price_ex'
          },
        ]
      },
      {
        Header: 'Item Price',
        columns: [
          {
            Header: props => chaosImage,
            accessor: 'itemPriceCh',
            minWidth: 70,
            headerClassName: 'cards-table__ch-column',
            className: 'cards-table__price cards-table__price_ch'
          },
          {
            Header: props => exaltedImage,
            accessor: 'itemPriceEx',
            minWidth: 70,
            headerClassName: 'cards-table__ex-column',
            className: 'cards-table__price cards-table__price_ex'
          },
        ]
      },
      {
        Header: 'Profit',
        columns: [
          {
            Header: props => chaosImage,
            accessor: 'profitCh',
            minWidth: 70,
            headerClassName: 'cards-table__ch-column',
            className: 'cards-table__price cards-table__price_ch'
          },
          {
            Header: props => exaltedImage,
            accessor: 'profitEx',
            minWidth: 70,
            headerClassName: 'cards-table__ex-column',
            className: 'cards-table__price cards-table__price_ex'
          },
        ]
      },
      {
        Header: 'Margin',
        accessor: 'margin',
        minWidth: 60,
        headerClassName: 'cards-table__margin-heading',
        className: 'cards-table__margin'
      },
      {
        Header: '',
        minWidth: 50,
        Cell: props => searchBtn
      },
    ];

    return(
      <div className = "App" >
        <ReactTable data={this.state.items}
          columns={columns}
          defaultSorted={[{id:'cardPriceCh'}]}
          resizable={false}
          minRows={0}
          showPagination={false}
          className='-highlight cards-table' />
      </div>
    ); 
  }
}

export default CardsTable;
