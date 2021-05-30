import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import arrayMove from 'array-move';
import clsx from 'clsx';
import {Link} from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import DraggableColorList from './DraggableColorList';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

const drawerWidth = 400;


const styles = theme => ({
    root: {
        display: 'flex',
        height: '100vh'
      },
      appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      upperValid: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '20%'
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      hide: {
        display: 'none',
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: drawerWidth,
      },
      drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(0),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
      },
      contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
      colorPalette: {
          height: '85%'
      },
      upperBtn: {
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: '80px'
      },
      pickerValidContainer:{
          height: '50%',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          '& button':{
              padding: '10px 120px'
          }
      } 
    });

class CreatePalette extends Component {
static defaultProps = {
maxColorBox: 20
};

constructor(props){
super(props);
this.state = {
    open: false,
    newColor: 'blue',
    newColorName: '',
    newPaletteName: '',
    allNewColors: this.props.palettes[0].colors,
    isEmpty: false,
    isDisabled: false,
    isDialogueOpen: false,
    isEmojiPickerShow: false
};
this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
this.handleDrawerClose = this.handleDrawerClose.bind(this);
this.handleColorChange = this.handleColorChange.bind(this);
this.handleColorNameChange = this.handleColorNameChange.bind(this);
this.handleNameSubmit = this.handleNameSubmit.bind(this);
this.handleDelete = this.handleDelete.bind(this);
this.handlePaletteNameChange = this.handlePaletteNameChange.bind(this);
this.handleNewPaletteSave = this.handleNewPaletteSave.bind(this);
this.generateRandomColor = this.generateRandomColor.bind(this);
this.clearPalette = this.clearPalette.bind(this);
this.handleDialogueOpen = this.handleDialogueOpen.bind(this);
this.handleDialogueClose = this.handleDialogueClose.bind(this);
this.handleEmojiPicker = this.handleEmojiPicker.bind(this);
};


componentDidMount() {
    // color name  validation
    ValidatorForm.addValidationRule('isNameMatched', (value) => {
        let found = [];
        this.state.allNewColors.forEach(curObj => {
            if(curObj.name.toLowerCase() === value.toLowerCase()){
                found.push(curObj);
            };
        });

        if(found.length === 0) {
            return true;
        } else {
            return false;
        }
    });
    // color  validation
    ValidatorForm.addValidationRule('isColorMatched', (value) => {
        let found = [];
        this.state.allNewColors.forEach(curObj => {
            if(curObj.color === this.state.newColor){
                found.push(curObj);
            };
        });

        if(found.length === 0) {
            return true;
        } else {
            return false;
        }
    });
    // Palette Name  validation
    ValidatorForm.addValidationRule('isPalettenameMatch', (value) => {
        let found = [];
        this.props.palettes.forEach(curObj => {
          if(curObj.paletteName.toLowerCase().trim().replace(/ /g, '') === value.toLowerCase().trim().replace(/ /g, '')){
              found.push(curObj);
          };
        });
        if(found.length === 0) {
            return true;
        } else {
            return false;
        }
    });
};


handleDrawerOpen(){
this.setState({open: true})
};

handleDrawerClose(){
 this.setState({open: false})   
};


handleColorChange(newC){
this.setState({newColor: newC.hex})
};


handleColorNameChange(e){
this.setState({newColorName: e.target.value});
};


handleNameSubmit(){

    const name = this.state.newColorName;
    const background = this.state.newColor;
    
    const newColorBox = {
        name: name,
        color: background
    };
    
    const someRandomCol = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
    const randColor = someRandomCol[Math.floor(Math.random() * someRandomCol.length)];
     
    this.setState({
        allNewColors: [...this.state.allNewColors, newColorBox], 
        newColorName: '', 
        newColor: randColor
    });
    
};


handleDialogueOpen(){
  this.setState({isDialogueOpen: true});
};
handleDialogueClose(){
  this.setState({isDialogueOpen: false});
};


handleDelete(name){
this.setState({
  allNewColors: this.state.allNewColors.filter(curObj => curObj.name !== name)
});
};


handlePaletteNameChange(e){
this.setState({newPaletteName: e.target.value});
};


handleNewPaletteSave(newEmoji){
    if(this.state.allNewColors.length === 0) {
        this.setState({isEmpty: true, isDisabled: true, newPaletteName: ''}, () => {
          setTimeout(() => {
            this.setState({isEmpty: false, isDisabled: false});
          }, 2000);
        }); 
    } else {
        const pName = this.state.newPaletteName;
        const pId = pName.toLowerCase().replace(/ /g, '-');
        const colrs = this.state.allNewColors;
        
        const obj = {
            paletteName: pName,
            id: pId,
            colors: colrs,
            emoji: newEmoji
        }
        
        this.props.newPaletteSave(obj);
        
        this.props.history.push('/');
    }; 


};


onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({allNewColors}) => ({
        allNewColors: arrayMove(allNewColors, oldIndex, newIndex),
    }));
  };


generateRandomColor() {
let colorArrays = [];

this.props.palettes.forEach(curObj => {
    colorArrays.push(curObj.colors);
});

const flatted = colorArrays.flat();

const randColorObj = flatted[Math.floor(Math.random() * flatted.length)];

if(this.state.allNewColors.length === 0) {
    this.setState({allNewColors: [...this.state.allNewColors, randColorObj]});
} else {
    this.state.allNewColors.forEach(curObj => {
        if(curObj.name !== randColorObj.name) {
            this.setState({allNewColors: [...this.state.allNewColors, randColorObj]});
        } else if (curObj.name === randColorObj.name){
            let newrandObj = flatted[Math.floor(Math.random() * flatted.length)];
            this.setState({allNewColors: [...this.state.allNewColors, newrandObj]});
        } 
    });
}



};


clearPalette(){
this.setState({allNewColors: []})
};


handleEmojiPicker(){
this.setState({isEmojiPickerShow: true});
};


render() {

 const {classes, maxColorBox} = this.props;
 const {open, newColor, newColorName, allNewColors, newPaletteName, palettes, newPaletteSave, isEmpty, isDisabled, isDialogueOpen, isEmojiPickerShow} = this.state;   
 
 const isExceeded = allNewColors.length >= maxColorBox;

return (
    <div className={classes.root}>
        <CssBaseline />
      <AppBar
        color='inherit'
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={this.handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Create New Palette
          </Typography>
        </Toolbar>
            
         <div className={classes.upperValid}>
         <Button 
          variant="contained"
          color="primary" 
          onClick={this.handleDialogueOpen}>
          Save
          </Button>

        
          {/* Go Back Button */}
          <Link style={{textDecoration: 'none'}} to='/'>
              <Button 
              variant="contained" 
              color="secondary"
              disabled={isDisabled}
              >
              Go Back
              </Button>
          </Link>

         </div>

         
        {/* Dialogue  */}
        <Dialog open={isDialogueOpen} onClose={this.handleDialogueClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Customize Palette name and Emoji</DialogTitle>

        {isEmojiPickerShow && (
          <Picker
           title='Choose an Emoji'
           onSelect={(emojiObj) => this.handleNewPaletteSave(emojiObj.native)}
           />
        )} 
        
        {!isEmojiPickerShow && (
            <ValidatorForm 
            onSubmit={this.handleEmojiPicker}
            >

            <DialogContent>
            <DialogContentText>
            To Create this Palette please enter an unique and new palette name and click Save Palette button.
            </DialogContentText>


            <TextValidator
            fullWidth
            label="Enter New Palette Name"
            value={newPaletteName}
            onChange={this.handlePaletteNameChange}
            validators={['required', 'isPalettenameMatch']}
            errorMessages={['this field is required', 'Name already taken']}
            />

            </DialogContent>

            <DialogActions>
            <Button onClick={this.handleDialogueClose} color="primary">
            Cancel
            </Button>


            <Button 

            color="primary"
            type='submit'
            disabled={isDisabled}
            >
            Save Palette
            </Button>
            </DialogActions>
            </ValidatorForm>
        )}  
       
      </Dialog>

           

      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
         
      
           <Typography style={{textAlign: 'center', margin: '15px 0'}} variant="h6" noWrap>
            Select A Color
          </Typography>
          {/* Button clear and random */}
           <div className={classes.upperBtn}>
                <Button 
                variant="contained" 
                color="secondary"
                onClick={this.clearPalette}
                >
                  Clear Palette
                </Button>

                <Button 
                variant="contained" 
                color="primary"
                onClick={this.generateRandomColor}
                disabled={isExceeded}
                >
                  Random Color
                </Button>

           </div>
            
            <div className={classes.pickerValidContainer}>
           {/* Chrome Picker */}
           <ChromePicker 
            className={classes.ChromePicker}
            color={newColor}
            onChange={this.handleColorChange}
            />
            
              
            {/* Validate Color */}

            <ValidatorForm 
            onSubmit={this.handleNameSubmit}
            style={
                {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }
            }
            >

                <TextValidator
                style={{margin: '20px 0'}}
                label="Enter Color Name"
                onChange={this.handleColorNameChange}
                value={newColorName}
                validators={['required', 'isNameMatched', 'isColorMatched']}
                errorMessages={['this field is required', 'Name already taken', 'Color already exists in the palette']}
                />


                <Button 
                variant="contained" 
                style={{backgroundColor: `${isExceeded ? 'lightgrey' : newColor}`}} 
                color="primary"
                type='submit'
                disabled={isExceeded}
                >
                    Add Color
                </Button>
            </ValidatorForm>
            </div>
 
      </Drawer>


      {/* Main body Content */}
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
           {isEmpty && (
               <Alert variant="filled" severity="error">
                 Palette is Empty. Can not create an Empty Palette!
               </Alert>
           )} 
          <div className={classes.colorPalette}>
                <DraggableColorList
                allNewColors={allNewColors}
                handleDelete={this.handleDelete}
                onSortEnd={this.onSortEnd}
                axis='xy'
                />

          </div>

      </main>
    </div>
)
}
};

export default withStyles(styles)(CreatePalette);