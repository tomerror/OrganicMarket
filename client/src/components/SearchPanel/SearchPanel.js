import React from 'react';
import SearchIcon from '@material-ui/icons/Search';

const searchPanel = (props) => {
    return (
        <div className={props.cartSection}>
            <input className={props.toolbarInput} placeholder="Search..." onChange={(e) => props.search(e)} />
            <SearchIcon style={props.css} />
        </div>
    )
}
export default searchPanel;