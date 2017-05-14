var React = require('react');
var { connect } = require('react-redux');
var actions = require('actions');
var AdminDsDiaDanh = require('adminDsDiaDanh');
var Admin = React.createClass({
    componentWillMount: function () {
        var { dispatch, diadanh } = this.props;
        dispatch(actions.layDsDiaDanh());
    },
    themDiaDanh: function (e) {
        e.preventDefault();
        var { dispatch, diadanh } = this.props;
        var madiadanh = this.refs.madiadanh.value;
        var tendiadanh = this.refs.tendiadanh.value;
        dispatch(actions.themDiaDanh(madiadanh, tendiadanh));
        this.refs.madiadanh.value = '';
        this.refs.tendiadanh.value = '';
    },
    render: function () {
        var { dispatch, diadanh } = this.props;

        var hienThiDiaDanh = function () {
            if (diadanh.dsDiaDanh.length > 0) {
                return diadanh.dsDiaDanh.map((dd, k) => {
                    return <AdminDsDiaDanh dd={dd} key={k} />
                })
            }
            return <div>Chưa có địa danh nào.</div>
        }

        return (
            <div className="admin">
                <div className="row">
                    <div className="column large-6 diadanh-form">
                        <form onSubmit={this.themDiaDanh}>
                            <h3 className="text-center">Thêm địa danh</h3>
                            <h6>Mã địa danh</h6>
                            <input type="text" ref="madiadanh" placeholder="PY" required />

                            <h6>Tên địa danh</h6>
                            <input type="text" ref="tendiadanh" placeholder="Phú Yên" />

                            <p><input type="submit" className="button expanded" value="Thêm địa danh"></input></p>
                        </form>
                    </div>
                    <div className="column large-4 ds">
                        <h4 className="text-center">Danh sách địa danh</h4>
                        <div className="scoll-dsdiadanh">
                            {hienThiDiaDanh()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})

module.exports = connect(state => {
    return state;
})(Admin);