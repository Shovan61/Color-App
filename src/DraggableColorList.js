import React, { Component } from 'react';
import {SortableContainer} from 'react-sortable-hoc';
import DraggableColorBox from './DraggableColorBox';
import { withStyles } from '@material-ui/core/styles';


const styles = {
root:{
height: '100%'
}
};

class DraggableColorList extends Component {
render() {
    const {classes, handleDelete, allNewColors} = this.props;
return (
    <div className={classes.root}>
        {allNewColors.map((curBox, i) => (
                <DraggableColorBox
                index={i}
                name={curBox.name}
                background={curBox.color}
                handleDelete={handleDelete}
                />
            ))}
    </div>
)
}
};


export default SortableContainer(withStyles(styles)(DraggableColorList));
