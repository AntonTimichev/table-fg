import React, {Component} from 'react';
import UserData from './UserData.js';
import BreadCrumbs from './BreadCrambs';
import TableView from './TableView';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      searchString: '',
      sort: {
        index: '',
        type: ''
      },
      activePageIndex: 0,
      rowsCount: 10,
      header: [
        'ID',
        'Name',
        'Surname',
        'Phone',
        'E-mail'
      ]
    };
  }

  onChangeSearch = e => {
    e.preventDefault();
    this.setState({
      searchString: e.target.value,
      activePageIndex: 0
    });
  };

  onCrumbClick = index => e => {
    e.preventDefault();
    this.setState({activePageIndex: index})
  };

  onSortClick = (index, type) => e => {
    e.preventDefault();
    const {sort} = this.state;
    if (index === sort.index && type === sort.type) {
      index = null;
      type = null;
    }
    this.setState({sort: {index, type}});
  };

  onIdClick = e => {
    e.preventDefault();
    const id = e.target.innerText;
    this.getUserData(id);
  };

  getUserData = id => {
    const {data} = this.props;
    this.setState({
      user: data.find(user => {
        return user.id === +id;
      })
    });
  };

  getFilteredList(list) {
    const {activePageIndex, rowsCount, searchString} = this.state;
    if (searchString) {
      list = list.filter(row => {
        return row.some(cell => {
          return String(cell).includes(searchString)
        });
      });
    }
    const startIndex = activePageIndex * rowsCount;
    this.pageNumber = Math.ceil(list.length / rowsCount) || 0;
    return list.slice(startIndex, startIndex + rowsCount)
  }

  getSortedList(list) {
    const {sort: {index, type}} = this.state;
    if (!type) return list;
    return list.sort((a, b) => {
      switch (type) {
        case 'up':
          if (a[index] > b[index]) return 1;
          if (a[index] < b[index]) return -1;
          break;
        case 'down':
          if (a[index] > b[index]) return -1;
          if (a[index] < b[index]) return 1;
          break;
        default: break;
      }
    })
  }

  render() {
    const {list} = this.props;
    const {activePageIndex, searchString, sort, header, user} = this.state;
    let renderedList = this.getFilteredList(this.getSortedList(list.slice()));
    return (
      <div className='container'>
        <div className='user-container'>
          {user && <UserData user={user} />}
        </div>
        <div className='wrapper'>
          <div className="search-container">
            <input type="text"
               onChange={() => {}}
               value={searchString}
               onInput={this.onChangeSearch}
               placeholder='Search...'
            />
          </div>
          <div className='table-container'>
            <TableView className='table-list'
               sortInfo={sort}
               onSortClick={this.onSortClick}
               onIdClick={this.onIdClick}
               list={renderedList}
               header={header}
            />
          </div>
          <div className="bread-crumbs-container">
            <BreadCrumbs
              pageNumber={this.pageNumber}
              activePageIndex={activePageIndex}
              onCrumbClick={this.onCrumbClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Table;
