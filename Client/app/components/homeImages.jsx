var React = require('react');
var { connect } = require('react-redux');
var actions = require('actions');

var HomeImages = React.createClass({

    render: function () {
        var {anh, dispatch} = this.props;

        return (
            <div className="row homeImages">
                <div className="card-flex-article card">
                    <div className="card-image">
                        <img src={anh.url} />
                        <span className="label alert card-tag">#{anh.madiadanh}</span>
                    </div>
                    <div className="card-section">
                        <h3 className="article-title">{anh.sohuu}</h3>
                        <p className="article-summary">{anh.camnhan}</p>
                    </div>
                    <div className="chucnang">
                        <div className="notability">
                            <span className="publications">Lượt thích</span>
                            <span className="likes"># {anh.soluotthich}</span>
                        </div>
                        <div className="card-actions">
                            <button className="button-hover-like button"><span>Thích</span><i className="ion-android-favorite"></i></button>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
})

module.exports = connect(state => {
    return state;
})(HomeImages);