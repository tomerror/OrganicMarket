import React from 'react';
import { NavLink } from 'react-router-dom';

const Tabs = (props) => props.tabs.map((tab, index) => {
    return (
        <NavLink to={`/shop/${tab}`} exact key={index}>
            <div className={props.styles.tab}>
                {tab}
            </div>
        </NavLink>
    )
})

// onClick={() => props.menuFunc(`${tab}`)}

export default Tabs;