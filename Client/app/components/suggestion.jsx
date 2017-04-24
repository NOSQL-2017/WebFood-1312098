var React = require('react');


var Suggestion = React.createClass({

    render: function() {
        
        return (
            <div>
                <section className="section-suggestion">
                    <div className="row">
                        <h2>Cộng đồng phượt thủ</h2>
                        <p className="long-copy">
                            Chào bạn, cộng đồng phượt thủ là nơi kết nối đam mê du lịch
                            . Bạn đang cô đơn trên từng con đường. Hãy để chúng tôi kết nối bạn
                            với cộng đồng chung một đam mê.
                        </p>
                    </div>

                    <div className="row">
                        <div className="col">
                            <div className="col span_1_of_4 box">
                                <i className="ion-ios-people icon-big"></i>
                                <h3>Kết bạn giao lưu</h3>
                                <p>
                                    Với cộng đông thành viên trên toàn Việt Nam và thế giới.
                                </p>
                            </div>

                            <div className="col span_1_of_4 box">
                                <i className="ion-heart icon-big"></i>
                                <h3>Chia sẽ kinh nghiệm</h3>
                                <p>
                                    Viết bài và chia sẽ kinh nghiệm của bạn với mọi người.
                                </p>
                            </div>

                            <div className="col span_1_of_4 box">
                                <i className="ion-images icon-big"></i>
                                <h3>Giới thiệu địa điểm</h3>
                                <p>
                                    Bạn có địa điểm đẹp hãy chia sẽ ngay.
                                </p>
                            </div>

                            <div className="col span_1_of_4 box">
                                <i className="ion-location icon-big"></i>
                                <h3>Check-in</h3>
                                <p>
                                    Lưu lại ngay khoảng khắc đẹp trên đường đi.
                                </p>
                            </div>
                        </div>
                    </div>

                </section>
                
                <section className="suggestion-places">
                    <ul className="places-showcase">
                        <li>
                            <figure className="places-photo">
                                <img src="resources/img/mientay.jpg" alt="mien tay"/>
                            </figure>
                        </li>
                        <li>
                            <figure className="places-photo">
                                <img src="resources/img/hcm.jpg" alt="ho chi minh"/>
                            </figure>
                        </li>
                        <li>
                            <figure className="places-photo">
                                <img src="resources/img/dalat.jpg" alt="da lat"/>
                            </figure>
                        </li>
                        <li>
                            <figure className="places-photo">
                                <img src="resources/img/nhatrang.jpg" alt="nha trang"/>
                            </figure>
                        </li>
                    </ul>

                    <ul className="places-showcase">
                        <li>
                            <figure className="places-photo">
                                <img src="resources/img/danang.jpg" alt="da nang"/>
                            </figure>
                        </li>
                        <li>
                            <figure className="places-photo">
                                <img src="resources/img/vinhhalong.jpg" alt="vinh ha long"/>
                            </figure>
                        </li>
                        <li>
                            <figure className="places-photo">
                                <img src="resources/img/hanoi.jpg" alt="ha noi"/>
                            </figure>
                        </li>
                        <li>
                            <figure className="places-photo">
                                <img src="resources/img/sapa.jpg" alt="Sapa"/>
                            </figure>
                        </li>
                    </ul>
                </section>
            </div>
        )
    }
});


module.exports = Suggestion;
