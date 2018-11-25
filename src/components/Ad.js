import React, { Component } from 'react';
import '../css/Ad.css';

export default class Ad extends Component {
    componentDidMount () {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }

    render () {
        return (
            <div className='adContainer'>
                <ins 
                    className="adsbygoogle"
                    style={{
                        display: "inline-block",
                        width: "468px",
                        height: "60px"
                    }}
                    data-ad-client="ca-pub-5830175342552944"
                    data-ad-slot="5608403413"
                />
            </div>
        );
    }
}