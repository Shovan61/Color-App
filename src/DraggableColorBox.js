import React, { Component } from 'react';
import {SortableElement} from 'react-sortable-hoc';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import chroma from 'chroma-js';

const styles = {
root: {
backgroundColor: props => props.background,
display: 'inline-block',
height: '27.24%',
width: '20%',
"&:hover svg":{
    transform: 'scale(1.2)',
    transition: 'all 0.3s ease-in-out'
},
cursor: 'move',
cursor: 'grab',
"&:active": {
cursor: 'grabbing',
cursor: 'move',
}
// "&:active":{
//  cursor: 'grabbing',
//  cursor: '-moz-grabbing',
//  cursor: '-webkit-grabbing'   
// }
},
container: {
display: 'flex',
width: '100%',
height: '100%',
alignItems: 'flex-end',
justifyContent: 'space-between'
},
name:{
    color: props => chroma(props.background).luminance() > 0.09 ? 'black' : 'white',
},
delete:{
    color: props => chroma(props.background).luminance() > 0.09 ? 'black' : 'white',
    cursor: 'pointer',

}
};

class DraggableColorBox extends Component {
render() {
    const {classes, name, background, handleDelete} = this.props;
return (
    <div className={classes.root}>
        <div className={classes.container}>
            <span className={classes.name}>{name}</span>
            <DeleteIcon className={classes.delete} onClick={() => handleDelete(name)}/>
        </div>
    </div>
)
}
};


export default SortableElement(withStyles(styles)(DraggableColorBox));
