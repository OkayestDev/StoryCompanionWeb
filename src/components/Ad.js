import React, { Component } from 'react';

export default class Ad extends Component {
    componentDidMount () {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }

    render () {
        return (
            <div className='ad'>
                <ins 
                    className="adsbygoogle"
                    style={{
                        display: "inline-block",
                        width: "970px",
                        height:"90px"
                    }}
                    data-ad-client="ca-pub-5830175342552944"
                    data-ad-slot="7037019245"
                />
            </div>
        );
    }
}