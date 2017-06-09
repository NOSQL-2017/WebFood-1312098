import React from 'react';
import Information from './information';
import ListImages from './ListImages';

let Person = React.createClass({

    render: function() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <Information />
                    </div>
                    <div className="col-sm-8">
                        <ListImages />
                    </div>
                </div>
            </div>
        )
    }
})

module.exports = Person;
