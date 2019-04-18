import React from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import './CardsTable.scss';
import axios from 'axios';

class CardsTable extends React.Component {

  state = { items: [] };

  componentDidMount() {
    //axios.get('https://api.pathoftrade.com/table')
    axios.get('http://localhost:5000/table')
      .then(res => this.formatItems(res.data.tableEntries, res.data.exaltedPrice))
      .catch(err => console.log(err));
  }

  formatItems = (items, exaltedPrice) => {
    for (let item of items) {
      if (!item) continue; //TODO: remove

      for (let [key, val] of Object.entries(item)) {
        if (key.includes('Ch')) {
          item[key] = +val.toFixed(0);
        }
      }
      item.itemPriceEx = +(item.itemPriceCh / exaltedPrice).toFixed(2);
      item.cardPriceEx = +(item.cardPriceCh / exaltedPrice).toFixed(2);
      item.stackPriceCh = item.cardPriceCh * item.stack;
      item.stackPriceEx = +(item.cardPriceEx * item.stack).toFixed(2);
      item.profitCh = item.itemPriceCh - item.stackPriceCh;
      item.profitEx = +(item.itemPriceEx - item.stackPriceEx).toFixed(2);
      item.margin = (item.profitCh / item.itemPriceCh * 100).toFixed(2) + "%";
    }
    var filtered = items.filter((item, index, arr) => item.itemId >= 0); //TODO: remove
    this.setState({ items: filtered });
  }

  buildSearchCell = (cardName) => {
    const formattedCardName = cardName.replace(/ /g, '%20').replace(/'/, '%27');
    const url = `https://www.pathofexile.com/api/trade/search/Synthesis?redirect&source=
      {%22query%22:{%22filters%22:{%22type_filters%22:{%22filters%22:{%22category%22:{%22option%22:%22card%22}}}},%22type%22:
      %22${formattedCardName}%22}}`;
    return (
      <a className='cards-table__search-btn' href={url} target='_blank' rel='noopener noreferrer'>
        <img className='cards-table__search-icon' alt='search on pathofexile.com' src='/images/search.svg' />
      </a>
    );
  }

  buildProfitCell = (profit, isEx) => {
    let className = 'cards-table__num_neutral';
    if (profit > 0) {
      className = 'cards-table__num_positive';
    }
    else if (profit < 0) {
      className = 'cards-table__num_negative';
    }
    return <div className={`cards-table__price cards-table__price_${isEx ? 'ex' : 'ch'} ${className}`}>{profit}</div>;
  }

  buildMarginCell = (margin) => {
    let className = 'cards-table__num_neutral';
    const marginNum = Number(margin.substring(0, margin.length - 1));

    if (marginNum > 0) {
      className = 'cards-table__num_positive';
    }
    else if (marginNum < 0) {
      className = 'cards-table__num_negative';
    }
    return <div className={`cards-table__price cards-table__margin ${className}`}>{margin}</div>;
  }

  render() {
    const chaosImage = <img className='cards-table__currency-icon' src={process.env.PUBLIC_URL + 'images/chaos.png'} alt='chaos' />;
    const exaltedImage = <img className='cards-table__currency-icon' src={process.env.PUBLIC_URL + 'images/exalted.png'} alt='exalted' />;
    const columns = [
      {
        Header: 'Card',
        accessor: 'card',
        minWidth: 170,
        headerClassName: 'cards-table__card-heading'
      },
      {
        Header: 'Card Price',
        columns: [
          {
            Header: props => chaosImage,
            accessor: 'cardPriceCh',
            minWidth: 50,
            headerClassName: 'cards-table__ch-column',
            className: 'cards-table__price cards-table__price_ch'
          },
          {
            Header: props => exaltedImage,
            accessor: 'cardPriceEx',
            minWidth: 50,
            headerClassName: 'cards-table__ex-column',
            className: 'cards-table__price cards-table__price_ex'
          },
        ]
      },
      {
        Header: 'Stack',
        accessor: 'stack',
        minWidth: 60,
        className: 'cards-table__stack'
      },
      {
        Header: 'Stack Price',
        columns: [
          {
            Header: props => chaosImage,
            accessor: 'stackPriceCh',
            minWidth: 50,
            headerClassName: 'cards-table__ch-column',
            className: 'cards-table__price cards-table__price_ch cards-table__price_stack'
          },
          {
            Header: props => exaltedImage,
            accessor: 'stackPriceEx',
            minWidth: 50,
            headerClassName: 'cards-table__ex-column',
            className: 'cards-table__price cards-table__price_ex cards-table__price_stack'
          },
        ]
      },
      {
        Header: 'Item',
        accessor: 'name',
        minWidth: 170,
        className: 'cards-table__item'
      },
      {
        Header: 'Item Price',
        columns: [
          {
            Header: props => chaosImage,
            accessor: 'itemPriceCh',
            minWidth: 50,
            headerClassName: 'cards-table__ch-column',
            className: 'cards-table__price cards-table__price_ch'
          },
          {
            Header: props => exaltedImage,
            accessor: 'itemPriceEx',
            minWidth: 50,
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
            minWidth: 50,
            headerClassName: 'cards-table__ch-column',
            //className: `cards-table__price cards-table__price_ch ${}`
            Cell: props => this.buildProfitCell(props.row.profitCh, false)
          },
          {
            Header: props => exaltedImage,
            accessor: 'profitEx',
            minWidth: 50,
            headerClassName: 'cards-table__ex-column',
            //className: 'cards-table__price cards-table__price_ex'
            Cell: props => this.buildProfitCell(props.row.profitEx, true)
          },
        ]
      },
      {
        Header: 'Margin',
        accessor: 'margin',
        minWidth: 70,
        headerClassName: 'cards-table__margin-heading',
        //className: 'cards-table__margin',
        Cell: props => this.buildMarginCell(props.row.margin),
        sortMethod: (a, b, desc) => {
          const aNum = Number(a.substring(0, a.length - 1));
          const bNum = Number(b.substring(0, b.length - 1));
          return aNum > bNum ? 1 : -1;
        }
      },
      {
        Header: '',
        minWidth: 34,
        Cell: props => this.buildSearchCell(props.row.card)
      },
    ];

    return (
      <div className="App" >
        <ReactTable data={this.state.items}
          columns={columns}
          defaultSorted={[{ id: 'cardPriceCh', desc: true }]}
          resizable={false}
          minRows={0}
          showPagination={false}
          pageSize={this.state.items.length}
          className='-striped -highlight cards-table' />
      </div>
    );
  }
}

export default CardsTable;
