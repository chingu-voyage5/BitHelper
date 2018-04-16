import React from 'react';

const Tag = (props) => {
    return (
        <div className={`category-tag`} onClick={props.removeTag.bind(this, props.name)}>
            <p>{props.name}</p>          
        </div>
    )
};

export default Tag;