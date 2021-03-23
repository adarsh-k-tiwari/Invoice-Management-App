import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';


const useStyles = makeStyles({
    root: {
        color: 'white',
        borderRadius: '8px',
        borderColor: '#14AFF1',
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
        marginLeft: "1vw",
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
        padding: "15px 20px 15px 20px",
        border: "1px solid #14AFF1",
        marginLeft: "7vw",
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
        "&:hover": {
            border: "1px solid #14AFF1",
        },
      },
  });


export default function AddButton(props) {
  const [open, setOpen] = React.useState(false);
    console.log(props);
  const [add, setAdd]=React.useState(
    {
        name_customer:'',cust_number:'',invoice_id:'',total_open_amount:'',due_in_date:'',notes:''
    }
);

const handleChange = (event)=>{
  setAdd({...add,[event.target.name]:event.target.value})
}
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClear = (event) => {
    setAdd({name_customer:'',cust_number:'',invoice_id:'',total_open_amount:'',due_in_date:'',notes:''})
  }
  
    const handleSubmit = (e)=>{
        setOpen(false);
        e.preventDefault()
        axios.post("http://localhost:8080/1805695/add",
        {},
    {
      headers: { 'Content-Type': 'application/json' },
      params: add,
    })
    }
  const classes = useStyles();

  return (

    <div style={{display: 'flex'}}>
     <Button className={classes.mainButton} variant="outlined" color="primary" onClick={handleClickOpen} >
      <AddIcon/> Add
      </Button>
      
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle style={{backgroundColor: "#2A3E4C", color: "#FFFFFF", position:"relative"}}  id="form-dialog-title" >Add Invoice 
            <CloseIcon onClick={handleClose} className={classes.root} variant="outlined" color="primary" style={{paddingLeft:'24.5vw', marginTop:'1vh'}}/>
            </DialogTitle>
            
            
            <div style={{backgroundColor: "#2A3E4C", color: "#97A1A9", display:'flex'}} >
                <div>
                    <DialogContent>
                    Customer Name <span style={{color:'#FF5B5B'}}>*</span>
                    <TextField
                            required
                            autoFocus
                            onChange={handleChange}
                            name="name_customer"
                            margin="dense"
                            label=""
                            autoComplete="off"
                            type="name"
                            variant="outlined"
                            fullWidth
                            InputProps={{style: { color: "white",}}}
                        />
                    </DialogContent>

                    <DialogContent>
                    Customer No <span style={{color:'#FF5B5B'}}>*</span>
                    <TextField
                    required
                        autoFocus
                        onChange={handleChange}
                        name="cust_number"
                        margin="dense"
                        id="name"
                        label=""
                        type="number"
                        variant="outlined"
                        fullWidth
                        InputProps={{style: { color: "white",}}}
                    />
                    </DialogContent>

                    <DialogContent>
                        Invoice No <span style={{color:'#FF5B5B'}}>*</span>
                    <TextField
                    required
                        autoFocus
                        onChange={handleChange}
                        name="invoice_id"
                        margin="dense"
                        id="name"
                        label=""
                        type="number"
                        variant="outlined"
                        fullWidth
                        InputProps={{style: { color: "white",}}}
                    />
                    </DialogContent>
                    <DialogContent>
                        Invoice Amount <span style={{color:'#FF5B5B'}}>*</span>
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
                </div>
                    
                <div>
                    <DialogContent>
                        Due Date <span style={{color:'#FF5B5B'}}>*</span>
                        <TextField
                        required
                            autoFocus
                            onChange={handleChange}
                            name="due_in_date"
                            margin="dense"
                            id="name"
                            label=""
                            type="date"
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
            <Button onClick={handleClear} className={classes.outlinedButton} variant="outlined" color="primary">
                Clear
            </Button>
            <Button  onClick={handleSubmit} className={classes.containedButton} variant="contained" color="primary">
                Add
            </Button>
            </Grid>
            </DialogActions>
        </Dialog>
      </div>
    
    
  );
}
