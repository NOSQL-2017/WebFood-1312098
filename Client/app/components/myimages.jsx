var React = require('react');
var { connect } = require('react-redux');
var actions = require('actions');
var {Link} = require('react-router');

var MyImages = React.createClass({

    render: function () {
        return (
            <div className="MyImages">
                <div className="row">
                    <div className="column large-2 chucnang">
                        <div className="menu">
                            <div className="vertical-menu">
                                <Link className="active">Chức năng</Link>
                                <Link to="/images">Ảnh đã đăng</Link>
                                <Link to="/images/upload">Đăng ảnh</Link>
                            </div>
                        </div>
                    </div>
                    <div className="column large-10 hienthi">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = connect(
    state => {
        return state;
    }
)(MyImages);