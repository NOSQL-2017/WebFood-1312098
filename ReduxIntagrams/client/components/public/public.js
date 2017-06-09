import React from 'react';

var Public = React.createClass({
  render: function() {
    return (

      <section>
        <div className="board">
          {/* <h2>Welcome to IGHALO!<sup>™</sup></h2>*/}
          <div className="board-inner">
            <ul className="nav nav-tabs" id="myTab">
              <div className="liner" />
              <li className="active">
                <a href="#food" data-toggle="tab" title="food">
                  <span className="round-tabs one">
                    Food
                  </span> 
                </a></li>
              <li><a href="#city" data-toggle="tab" title="city">
                  <span className="round-tabs two">
                    {/*<i class="fa fa-glass" aria-hidden="true"></i>*/}
                    City
                  </span> 
                </a>
              </li>
              <li><a href="#fashion" data-toggle="tab" title="fashion">
                  <span className="round-tabs three">
                    Fashion
                  </span> </a>
              </li>
            </ul></div>
          <div className="tab-content">
            <div className="tab-pane fade in active" id="food">
              <div className="row">
                <div className="col-md-4 col-sm-6 col-xs-6 thumbnail">
                  <img src="http://lorempixel.com/500/500/food/1/" className="img-responsive" />
                </div>{/*col-md-4 col-sm-6 col-xs-6*/}
                <div className="col-md-4 col-sm-6 col-xs-6 thumbnail">
                  <img src="http://kids.nationalgeographic.com/content/dam/kids/photos/articles/Other%20Explore%20Photos/R-Z/Wacky%20Weekend/Wild%20Cats/ww-wild-cats-tiger.adapt.945.1.jpg" className="img-responsive" />
                </div>{/*col-md-4 col-sm-6 col-xs-6*/}
                <div className="col-md-4 col-sm-6 col-xs-6 thumbnail">
                  <img src="http://lorempixel.com/500/500/food/3/" className="img-responsive" />
                </div>{/*col-md-4 col-sm-6 col-xs-6*/}
                <div className="col-md-4 col-sm-6 col-xs-6 thumbnail">
                  <img src="http://lorempixel.com/500/500/food/4/" className="img-responsive" />
                </div>{/*col-md-4 col-sm-6 col-xs-6*/}
                <div className="col-md-4 col-sm-6 col-xs-6 thumbnail">
                  <img src="http://lorempixel.com/500/500/food/5/" className="img-responsive" />
                </div>{/*col-md-4 col-sm-6 col-xs-12*/}
                <div className="col-md-4 col-sm-6 col-xs-6 thumbnail">
                  <img src="http://lorempixel.com/500/500/food/6/" className="img-responsive" />
                </div>{/*col-md-4 col-sm-6 col-xs-6*/}
              </div>{/*row*/}
            </div>{/*--food*/}
            <div className="tab-pane fade" id="city">
              <div className="row">
                <div className="col-md-4 col-sm-6 col-xs-6 thumbnail">
                  <img src="http://lorempixel.com/500/500/city/1/" className="img-responsive" />
                </div>{/*col-md-4 col-sm-6 col-xs-6*/}
                <div className="col-md-4 col-sm-6 col-xs-6 thumbnail">
                  <img src="http://lorempixel.com/500/500/city/2/" className="img-responsive" />
                </div>{/*col-md-4 col-sm-6 col-xs-6*/}
                <div className="col-md-4 col-sm-6 col-xs-6 thumbnail">
                  <img src="http://lorempixel.com/500/500/city/3/" className="img-responsive" />
                </div>{/*col-md-4 col-sm-6 col-xs-6*/}
                <div className="col-md-4 col-sm-6 col-xs-6 thumbnail">
                  <img src="http://lorempixel.com/500/500/city/4/" className="img-responsive" />
                </div>{/*col-md-4 col-sm-6 col-xs-6*/}
                <div className="col-md-4 col-sm-6 col-xs-6 thumbnail">
                  <img src="http://lorempixel.com/500/500/city/5/" className="img-responsive" />
                </div>{/*col-md-4 col-sm-6 col-xs-6*/}
                <div className="col-md-4 col-sm-6 col-xs-6 thumbnail">
                  <img src="http://lorempixel.com/500/500/city/6/" className="img-responsive" />
                </div>{/*col-md-4 col-sm-6 col-xs-6*/}
              </div>{/*row*/}
            </div>{/*--city*/}
            <div className="tab-pane fade" id="fashion">
              <div className="row">
                <div className="col-md-4 col-sm-6 col-xs-6 thumbnail">
                  <img src="http://lorempixel.com/500/500/fashion/1/" className="img-responsive" />
                </div>{/*col-md-4 col-sm-6 col-xs-6*/}
                <div className="col-md-4 col-sm-6 col-xs-6 thumbnail">
                  <img src="http://lorempixel.com/500/500/fashion/7/" className="img-responsive" />
                </div>{/*col-md-4 col-sm-6 col-xs-6*/}
                <div className="col-md-4 col-sm-6 col-xs-6 thumbnail">
                  <img src="http://lorempixel.com/500/500/fashion/8/" className="img-responsive" />
                </div>{/*col-md-4 col-sm-6 col-xs-6*/}
                <div className="col-md-4 col-sm-6 col-xs-6 thumbnail">
                  <img src="http://lorempixel.com/500/500/fashion/4/" className="img-responsive" />
                </div>{/*col-md-4 col-sm-6 col-xs-6*/}
                <div className="col-md-4 col-sm-6 col-xs-6 thumbnail">
                  <img src="http://lorempixel.com/500/500/fashion/5/" className="img-responsive" />
                </div>{/*col-md-4 col-sm-6 col-xs-6*/}
                <div className="col-md-4 col-sm-6 col-xs-6 thumbnail">
                  <img src="http://lorempixel.com/500/500/fashion/6/" className="img-responsive" />
                </div>{/*col-md-4 col-sm-6 col-xs-6*/}
              </div>{/*row*/}
            </div>{/*three*/}
          </div>
        </div>
      </section>
    );
  }
});

module.exports = Public;