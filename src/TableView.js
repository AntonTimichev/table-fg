import React, { Component } from 'react';

class TableView extends Component {
  render() {
    return (
      <table className='table-list'>
        {this.renderHeader()}
        {this.renderBody()}
      </table>
    )
  }

  getStyle(indexColumn, sortType) {
    const {sortInfo: {index, type}} = this.props;
    return {background: index === indexColumn && type === sortType ? 'green' : 'transparent'}
  }

  renderHeader() {
    const {onSortClick, header} = this.props;
    return (
      <thead>
        <tr>
          {
            header.map((column, index) => {
              return (
                <th key={index}>
                  {column}
                  <span
                    className='sort-btn'
                    style={this.getStyle(index, 'up')}
                    onClick={onSortClick(index, 'up')}
                  >&lt;</span>
                  <span
                    className='sort-btn'
                    style={this.getStyle(index, 'down')}
                    onClick={onSortClick(index, 'down')}
                  >&gt;</span>
                </th>
              )
            })
          }
        </tr>
      </thead>
    )
  }

  renderBody() {
    const {onIdClick, list} = this.props;
    return (
      <tbody>
        {
          list.map((row, index) => {
            return (
              <tr key={index}>
                {
                  row.map((cell, index) => {
                    return (
                      index === 0 ?
                      <td key={index} onClick={onIdClick} className='cell-id'>{cell}</td> :
                      <td key={index}>{cell}</td>
                    )
                  })
                }
              </tr>
            )
          })
        }
      </tbody>
    )
  }
}

export default TableView;
