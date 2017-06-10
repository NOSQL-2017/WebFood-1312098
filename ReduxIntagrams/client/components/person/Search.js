import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { } from '../../actions/authActions';
import map from 'lodash/map';
import SearchResult from './SearchResult';

let SearchPerson = React.createClass({
  render: function () {
    let { auth } = this.props;
    let ListUser = [];
    if (auth.dsKetQua != null) {
      ListUser = map(auth.dsKetQua, (val, key) => {
        return <SearchResult key={key} nguoidung={val}  />
      })
    }
    return (
      <div className="container">
        <div className="row">
          {ListUser.length > 0 ? ListUser: <h3>Không tìm thấy người dùng nào cả</h3>}
        </div>
      </div>
    )
  }
})

module.exports = connect(state => {
  return state
})(SearchPerson);