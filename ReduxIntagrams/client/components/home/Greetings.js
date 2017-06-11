import React from 'react';

let Greetings = React.createClass({
  render: function() {
     return (
      <div>
        <div id="bootstrap-touch-slider" className="carousel bs-slider fade  control-round indicators-line" data-ride="carousel" data-pause="hover" data-interval={5000}>
          {/* Indicators */}
          <ol className="carousel-indicators">
            <li data-target="#bootstrap-touch-slider" data-slide-to={0} className="active" />
            <li data-target="#bootstrap-touch-slider" data-slide-to={1} />
            <li data-target="#bootstrap-touch-slider" data-slide-to={2} />
          </ol>
          {/* Wrapper For Slides */}
          <div className="carousel-inner" role="listbox">
            {/* Third Slide */}
            <div className="item active">
              {/* Slide Background */}
              <img src="https://images.pexels.com/photos/48726/pexels-photo-48726.jpeg?w=940&h=650&auto=compress&cs=tinysrgb" alt="Bootstrap Touch Slider" className="slide-image" />
              <div className="bs-slider-overlay" />
              <div className="container">
                <div className="row">
                  {/* Slide Text Layer */}
                  <div className="slide-text slide_style_left">
                    <h1 data-animation="animated zoomInRight">ReduxIntagrams</h1>
                    <p data-animation="animated fadeInLeft">Chia sẽ hình ảnh</p>
                   
                  </div>
                </div>
              </div>
            </div>
            {/* End of Slide */}
            {/* Second Slide */}
            <div className="item">
              {/* Slide Background */}
              <img src="https://images.pexels.com/photos/207990/pexels-photo-207990.jpeg?w=940&h=650&auto=compress&cs=tinysrgb" alt="Bootstrap Touch Slider" className="slide-image" />
              <div className="bs-slider-overlay" />
              {/* Slide Text Layer */}
              <div className="slide-text slide_style_center">
                <h1 data-animation="animated flipInX">Theo dõi</h1>
                <p data-animation="animated lightSpeedIn">Theo dõi mọi người</p>
              </div>
            </div>
            {/* End of Slide */}
            {/* Third Slide */}
            <div className="item">
              {/* Slide Background */}
              <img src="https://images.pexels.com/photos/144345/pexels-photo-144345.jpeg?w=940&h=650&auto=compress&cs=tinysrgb" alt="Bootstrap Touch Slider" className="slide-image" />
              <div className="bs-slider-overlay" />
              {/* Slide Text Layer */}
              <div className="slide-text slide_style_right">
               
              </div>
            </div>
            {/* End of Slide */}
          </div>{/* End of Wrapper For Slides */}
          {/* Left Control */}
          <a className="left carousel-control" href="#bootstrap-touch-slider" role="button" data-slide="prev">
            <span className="fa fa-angle-left" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </a>
          {/* Right Control */}
          <a className="right carousel-control" href="#bootstrap-touch-slider" role="button" data-slide="next">
            <span className="fa fa-angle-right" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </a>
        </div> {/* End  bootstrap-touch-slider Slider */}
      </div>
    )
  }
})

module.exports = Greetings;
