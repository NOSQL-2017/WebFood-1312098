var React = require('react');

var Header = require('header');

var Main = React.createClass({

    render: function() {

        return (
            <div>
                <Header />
                <div>
                   {this.props.children}
                </div>
                
            </div>
        )
    }
});

module.exports = Main;