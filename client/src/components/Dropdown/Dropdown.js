import React from 'react';

const dropdown = (props) => props.list.map((current, key) => {
    return <option value={current} key={key}>{current}</option>
})

export default dropdown;