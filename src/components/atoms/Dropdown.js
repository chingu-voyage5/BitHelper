import React from 'react';
import FaAngleUp from 'react-icons/lib/fa/angle-up';

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

const Dropdown = (props) => {
 
    const listItems = items.map(e => {
        let isActive = props.categories.includes(e.title);
        return <div className={`item-container ${isActive ? 'item-container--active' : ''}`} onClick={()=> { props.setActive(e); }}><li className="dropdown-item">{e.title}</li></div>
    });
    
    return (
        <div className="dropdown-container">
            <div className="arrow-top"></div>
            <div className="header-block" onClick={props.closeDropdown}>
                <h5>Tags</h5>
                <h6>{`Selected: ${props.categories.length}`}</h6>
                <FaAngleUp size={24} />
            </div>
            <div className="list-wrapper">
                <ul className="category-list">
                    {listItems}
                </ul>
            </div>
        </div>
    )
    
}

export default Dropdown;