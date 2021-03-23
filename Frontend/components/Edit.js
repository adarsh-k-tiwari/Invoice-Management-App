import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    action: {
      disabled: '#97A1A9',
      disabledBackground: '#97A1A9',
    }
  }
})
const useStyles = makeStyles({
    root: {
        color: 'white',
        borderRadius: '8px',
        borderColor: '#14AFF1',
        "& .Mui-disabled": {
          
            borderColor: "#356680",
          },
    },
    textButton: {
        color: "#14AFF1",
        fontFamily: "normal normal normal 20px/24px Ubuntu",
        fontSize: "1rem",
        borderRadius: "8px",
        textTransform: "None",
        height: "2.3rem",
        marginLeft: "1.1vw",
      },
    containedButton: {
        fontFamily: "normal normal normal 20px/24px Ubuntu",
        color: "#ffffff",
        backgroundColor: "#14AFF1",
        fontSize: "1rem",
        borderRadius: "8px",
        textTransform: "None",
        height: "2.3rem",
        marginLeft: "0.7vw",
        "&:hover": {
            backgroundColor: "#158bbd",
      },
      },
    outlinedButton: {
        color: "#ffffff",
        fontFamily: "normal normal normal 20px/24px Ubuntu",
        fontSize: "1rem",
        borderRadius: "8px",
        textTransform: "None",
        height: "2.3rem",
        border: "1px solid #14AFF1",
        
        "&:hover": {
            border: "1px solid #14AFF1",
        },
      },
      mainButton: {
        color: "#ffffff",
        fontFamily: "normal normal normal 20px/24px Ubuntu",
        fontSize: "1rem",
        borderRadius: "8px",
        textTransform: "None",
        height: "2.3rem",
        padding: "15px 20px 15px 20px",
        border: "1px solid #14AFF1",
        marginLeft: "1vw",
        "&:hover": {
            border: "1px solid #14AFF1",
        },
      },
  });

export default function EditButton(props) {
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit]=React.useState(
    {
        invoice_id:props.selectedRow , total_open_amount:'', notes:''      
    }
  );
  
  const handleChange = (event)=>{
    setEdit({...edit,[event.target.name]:event.target.value})
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = (e)=>{
    setOpen(false);
    e.preventDefault()
    axios.post("http://localhost:8080/1805695/edit",
    {},
{
  headers: { 'Content-Type': 'application/json' },
  params: { invoice_id: props.selectedRow, total_open_amount: edit.total_open_amount,  notes: edit.notes },
   
})
}
  const classes = useStyles();

  return (

    <div style={{display: 'flex'}}>
      
      {props.numSelected > 0 ? <Button  className={classes.mainButton} variant="outlined" color="primary" onClick={handleClickOpen} >
      <EditIcon/> Edit
      </Button> :<ThemeProvider theme={theme}> <Button disabled variant="outlined" className={classes.mainButton} onClick={handleClickOpen} >
      <EditIcon/> Edit
      </Button></ThemeProvider>}
      
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle style={{backgroundColor: "#2A3E4C", color: "#FFFFFF", position:"relative"}}  id="form-dialog-title" >Edit Invoice 
            <CloseIcon onClick={handleClose} className={classes.root} variant="outlined" color="primary" style={{paddingLeft:'12vw', marginTop:'1vh'}}/>
            </DialogTitle>
            
            <div style={{backgroundColor: "#2A3E4C", color: "#97A1A9", display:'flex'}} >
                <div>
                    
                    <DialogContent>
                        Invoice Amount 
                    <TextField
                    required
                        autoFocus
                        onChange={handleChange}
                        name="total_open_amount"
                        margin="dense"
                        id="name"
                        label=""
                        type="number"
                        variant="outlined"
                        fullWidth
                        InputProps={{style: { color: "white",}}}
                    />
                    </DialogContent>
                    <DialogContent>Notes                    
                        <TextField
                        style={{marginTop: "9px"}}
                            id="filled-multiline-static"
                            onChange={handleChange}
                            name="notes"
                            autofocus
                            multiline
                            rows={4}
                            variant="outlined"
                            fullWidth
                            InputProps={{style: { color: "white",}}}
                        />
                    </DialogContent>
                </div>
            </div>
        
            <DialogActions style={{backgroundColor: "#2A3E4C"}} >
                <Grid item xs ={6}>
            <Button onClick={handleClose} className={classes.textButton} variant="text" color="primary">
                Cancel
            </Button>
            </Grid>
            <Grid item xs ={6}> 
            <Button onClick={handleClose} className={classes.outlinedButton} variant="outlined" color="primary">
                Reset
            </Button>
            <Button onClick={handleSave} className={classes.containedButton} variant="contained" color="primary">
                Save
            </Button>
            </Grid>
            </DialogActions>
        </Dialog>
      </div>
    // </div>
    
  );
}
