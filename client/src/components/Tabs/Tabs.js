import React from 'react';

const Tabs = (props) => props.tabs.map((tab, index) => {
    return (
        <div className={props.styles.tab} onClick={() => props.menuFunc(`${tab}`)} key={index}>
            {tab}
        </div>
    )
})

export default Tabs;