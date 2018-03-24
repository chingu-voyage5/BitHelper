import React from 'react';
import Tag from '../atoms/Tag.js';

const buttonStyle = {
    backgroundColor: '#F3752B',
    borderRadius: '5px',
    padding: '5px 10px',
    border: '1px solid black'
};

const items = [
    {
        title: 'Web App'
    },
    {
        title: 'Desktop App'
    },
    {
        title: 'Javascript'
    },
    {
        title: 'React'
    },
    {
        title: 'Node'
    },
    {
        title: 'Python'
    }
];

const DropDown = (props) => {
    const listItems = items.map(e => {
        let isActive = props.categories.includes(e.title);
        return <div className={`item-container ${isActive ? 'item-container--active' : ''}`} onClick={()=> { props.setActive(e); }}><li>{e.title}</li></div>
    })
    return (
        <div>
            <div className='tag-container'>
                    {props.categories.map(e => {
                        return <Tag name={e} removeTag={props.removeTag} />
                    })}
            </div>
            <div className="category-container">
                <button style={buttonStyle} onClick={props.handleClick}>Select Categories</button>
            </div>
            
            {
                props.active && 
                <div className="dropdown-container">
                    <div className="arrow-top"></div>
                    <div className="list-wrapper">
                        <ul className="category-list">
                            {listItems}
                        </ul>
                    </div>
                </div>
            }
        </div>
    )
};

export default DropDown;