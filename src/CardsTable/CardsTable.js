import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './CardsTable.scss';
import axios from 'axios';
import { connect } from 'react-redux';

class CardsTable extends React.Component {
  state = { items: [] };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.stickyColumnHeaders);
    window.removeEventListener('resize', this.matchColumnHeaderWidthToTable);
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedLeague !== prevProps.selectedLeague) {
      this.setState({ items: [] });
      axios
        .get('https://api.pathoftrade.com/table?league=' + this.props.selectedLeague)
        //.get('http://localhost:5000/table?league=' + this.props.selectedLeague)
        .then(res => this.formatItems(res.data.tableEntries, res.data.exaltedPrice))
        .catch(err => console.log(err));
    }
  }

  formatItems = (items, exaltedPrice) => {
    for (let item of items) {
      for (let [key, val] of Object.entries(item)) {
        if (key.includes('Ch')) {
          item[key] = +val.toFixed(0);
        }
      }

      item.cardPriceEx = +(item.cardPriceCh / exaltedPrice).toFixed(2);
      item.stackPriceCh = item.cardPriceCh * item.stack;
      item.stackPriceEx = +(item.cardPriceEx * item.stack).toFixed(2);

      if (item.itemPriceCh) {
        //itemPrice can be null if item doesn't exist in current league yet
        item.itemPriceEx = +(item.itemPriceCh / exaltedPrice).toFixed(2);
        item.profitCh = item.itemPriceCh - item.stackPriceCh;
        item.profitEx = +(item.itemPriceEx - item.stackPriceEx).toFixed(2);
        item.margin = +((item.profitCh / item.itemPriceCh) * 100).toFixed(2);
      }
    }
    this.setState({ items });
  };

  buildSearchCell = cardName => {
    const formattedCardName = cardName.replace(/ /g, '%20').replace(/'/, '%27');
    const url = `https://www.pathofexile.com/api/trade/search/Synthesis?redirect&source=
      {%22query%22:{%22filters%22:{%22type_filters%22:{%22filters%22:{%22category%22:{%22option%22:%22card%22}}}},%22type%22:
      %22${formattedCardName}%22}}`;
    return (
      <a className="cards-table__search-btn" href={url} target="_blank" rel="noopener noreferrer">
        <img className="cards-table__search-icon" alt="search on pathofexile.com" src="/images/search.svg" />
      </a>
    );
  };

  buildProfitCell = (profit, isEx) => {
    let className = 'cards-table__num_neutral';
    let profitString = profit;
    if (profit === undefined) {
      profitString = 'N/A';
    }
    if (profit > 0) {
      className = 'cards-table__num_positive';
    } else if (profit < 0) {
      className = 'cards-table__num_negative';
    }
    return <div className={`cards-table__price cards-table__price_${isEx ? 'ex' : 'ch'} ${className}`}>{profitString}</div>;
  };

  buildMarginCell = margin => {
    let className = 'cards-table__num_neutral';
    let marginString = margin + '%';
    if (margin === undefined) {
      marginString = 'N/A';
    }
    if (margin > 0) {
      className = 'cards-table__num_positive';
    } else if (margin < 0) {
      className = 'cards-table__num_negative';
    }
    return <div className={`cards-table__price cards-table__margin ${className}`}>{marginString}</div>;
  };

  render() {
    const chaosImage = <img className="cards-table__currency-icon" src={process.env.PUBLIC_URL + 'images/chaos.png'} alt="chaos" />;
    const exaltedImage = <img className="cards-table__currency-icon" src={process.env.PUBLIC_URL + 'images/exalted.png'} alt="exalted" />;
    const columns = [
      {
        Header: 'Card',
        accessor: 'card',
        minWidth: 170,
        headerClassName: 'cards-table__card-heading',
        className: 'cards-table__card'
      },
      {
        Header: 'Card Price',
        columns: [
          {
            Header: props => chaosImage,
            id: 'cardPriceCh',
            accessor: row => {
              return row.cardPriceCh ? row.cardPriceCh : 'N/A';
            },
            minWidth: 55,
            headerClassName: 'cards-table__ch-column',
            className: 'cards-table__price cards-table__price_ch'
          },
          {
            Header: props => exaltedImage,
            id: 'cardPriceEx',
            accessor: row => {
              return row.cardPriceEx ? row.cardPriceEx : 'N/A';
            },
            minWidth: 55,
            headerClassName: 'cards-table__ex-column',
            className: 'cards-table__price cards-table__price_ex'
          }
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
            id: 'stackPriceCh',
            accessor: row => {
              return row.stackPriceCh ? row.stackPriceCh : 'N/A';
            },
            minWidth: 55,
            headerClassName: 'cards-table__ch-column',
            className: 'cards-table__price cards-table__price_ch cards-table__price_stack'
          },
          {
            Header: props => exaltedImage,
            id: 'stackPriceEx',
            accessor: row => {
              return row.stackPriceEx ? row.stackPriceEx : 'N/A';
            },
            minWidth: 55,
            headerClassName: 'cards-table__ex-column',
            className: 'cards-table__price cards-table__price_ex cards-table__price_stack'
          }
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
            id: 'itemPriceCh',
            accessor: row => {
              return row.itemPriceCh ? row.itemPriceCh : 'N/A';
            },
            minWidth: 55,
            headerClassName: 'cards-table__ch-column',
            className: 'cards-table__price cards-table__price_ch'
          },
          {
            Header: props => exaltedImage,
            id: 'itemPriceEx',
            accessor: row => {
              return row.itemPriceEx ? row.itemPriceEx : 'N/A';
            },
            minWidth: 55,
            headerClassName: 'cards-table__ex-column',
            className: 'cards-table__price cards-table__price_ex'
          }
        ]
      },
      {
        Header: 'Profit',
        columns: [
          {
            Header: props => chaosImage,
            accessor: 'profitCh',
            minWidth: 55,
            headerClassName: 'cards-table__ch-column',
            Cell: props => this.buildProfitCell(props.row.profitCh, false)
          },
          {
            Header: props => exaltedImage,
            accessor: 'profitEx',
            minWidth: 55,
            headerClassName: 'cards-table__ex-column',
            Cell: props => this.buildProfitCell(props.row.profitEx, true)
          }
        ]
      },
      {
        Header: 'Margin',
        accessor: 'margin',
        minWidth: 70,
        headerClassName: 'cards-table__margin-heading',
        Cell: props => this.buildMarginCell(props.row.margin)
      },
      {
        Header: '',
        minWidth: 40,
        Cell: props => this.buildSearchCell(props.row.card)
      }
    ];

    return (
      <div className="App">
        <ReactTable
          data={this.state.items}
          columns={columns}
          defaultSorted={[{ id: 'cardPriceCh', desc: true }]}
          resizable={false}
          minRows={0}
          showPagination={false}
          pageSize={this.state.items.length}
          className="-striped -highlight cards-table"
          noDataText="Loading..."
          defaultSortMethod={(a, b, desc) => {
            a = a === null || a === undefined || a === 'N/A' ? -Infinity : a;
            b = b === null || b === undefined || b === 'N/A' ? -Infinity : b;
            if (a > b) {
              return 1;
            }
            if (a < b) {
              return -1;
            }
            return 0;
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedLeague: state.selectedLeague
  };
};

export default connect(mapStateToProps)(CardsTable);
