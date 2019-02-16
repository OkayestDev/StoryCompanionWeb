import React from 'react';
import uuid from 'uuid';

const Slideshow = ({ slides, currentPage, perPage, slideClassName }) => {
    let renderedSlides = [];
    for (let i = 0; i < perPage; i++) {
        const offset = currentPage * perPage;
        if (typeof slides[i + offset] !== 'undefined') {
            const slide = slides[i + offset];
            renderedSlides.push(
                <div 
                    className="slideContainer"
                    key={uuid.v4()}
                >
                    {slide.name}
                    <img className={slideClassName} src={slide.src} />
                </div>
            );
        }
    }

    return <div className="slideShowContainer">{renderedSlides}</div>;
};

export default Slideshow;
