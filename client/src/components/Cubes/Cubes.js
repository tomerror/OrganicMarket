import React from 'react';
import Cube from '../Cube/Cube';

const Cubes = (props) => props.cubes.map((cube,key) => {
    return <Cube cube={cube} key={key}/>
})

export default Cubes;