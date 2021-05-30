import React, { Component } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';

const styles = {
root: {
height: '200px',
width: '250px',
border: '1px solid #444',
borderRadius: '10px',
display: 'flex',
flexDirection: 'column',
justifyContent: 'center',
alignItems: 'center',
cursor: 'pointer',
'&:hover svg':{
  opacity: '1'
}
},
miniPalette:{
height: '85%',
width: '100%',
display: 'flex',
flexWrap: 'wrap',
alignItems: 'center',
overflow: 'hidden',
position: 'relative',
left: '10px',


},
miniBox:{
  height: '20%',
  width: '23%',  
},
footer:{
    width: '90%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
},
delete: {
    backgroundColor: 'red',
    borderRadius: '7px',
    color: 'white',
    position: 'relative',
    cursor: 'pointer',
    top: '2px',
    left: '100px',
    marginBottom: '4px',
    opacity: '0'
    
},

};

class MiniColorPalette extends Component {
constructor(props){
super(props);
this.handleDelete = this.handleDelete.bind(this);
};    


gotoPalette(id){
this.props.history.push(`/palette/${id}`)
};

handleDelete(e){
e.stopPropagation();
this.props.deletePalette(this.props.id);
};


render() {
    const {classes, palette, name, emoji, id, deletePalette, allIds, isdeleteShow} = this.props;
    
//   const isdeleteShow = allIds.map(curid => curid === id ? false : true);
//     console.log(isdeleteShow, id);

return (
    <div className={classes.root} onClick={() => this.gotoPalette(id)}>
            {isdeleteShow && (
             <DeleteIcon 
             className={classes.delete} 
             style={{transition: 'all 0.3s ease-in-out'}}
             onClick={this.handleDelete}
             />
            )}

        <div className={classes.miniPalette}>
             {palette.colors.map(curColor => (
                 <div
                 style={{backgroundColor: curColor.color}} 
                 className={classes.miniBox}>                     
                 </div>
             ))}
        </div>

        <div className={classes.footer}>
          <span>{name}</span>
          <span>{emoji}</span>
        </div>
    </div>
)
}
};

export default withStyles(styles)(MiniColorPalette);
