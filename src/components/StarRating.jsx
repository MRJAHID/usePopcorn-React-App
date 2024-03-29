import React, {useState} from 'react';
import Star from "./Star";


const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
};

const starContainerStyle = {
    display: "flex",
};


const StarRating = ({maxRating = 5, color = '#fcc419', size = 42, className='', defaultRating=0, onSetRating}) => {
    const [rating, setRating] = useState(defaultRating)
    const [tempRating, setTempRating] = useState(0)

    const textStyle = {
        lineHeight: "1",
        margin: "0",
        color: color,
        fontSize: `${size / 1.5}px`,
    };

    function handleRating(rating) {
        setRating(rating)
        // onSetRating(rating)
    }

    return (
        <div style={containerStyle} className={className}>
            <div style={starContainerStyle}>
                {Array.from({length: maxRating}, (_, i) =>
                    <Star key={i} full={tempRating ? tempRating >= i + 1 : rating >= i + 1} color={color} size={size}
                          onRate={() => handleRating(i + 1)}
                          onHoverIn={() => setTempRating(i + 1)} onHoverOut={() => setTempRating(0)}/>
                )}
            </div>
            <p style={textStyle}>{tempRating || rating || ''}</p>
        </div>
    );
};



export default StarRating;