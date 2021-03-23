import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { jsPDF } from "jspdf";
import { renderToString } from "react-dom/server";
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

    },
    text: {
       
        fontFamily: "normal normal normal 20px/24px Ubuntu",
        fontSize: "1rem",
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
        marginLeft: "23vw",
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
        "&:hover": {
            border: "1px solid #14AFF1",
        },
      },
      spanEdit:{
        color:"#FFFFFF"
    }
  });


export default function Viewcorres(props) {
  const [open, setOpen] = React.useState(false);
  let [responseData, setResponseData] = React.useState([]);
 
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = (e)=>{
    setOpen(true);
    e.preventDefault()
    const response = axios.get(`http://localhost:8080/1805695/viewcorres?invoice_id=${props.selectedRow}`,
    {},
  )
  console.log(response.data);
  setResponseData([response.data]);
}

  const print = () => {
    var doc = new jsPDF();  
    doc.html(document.body, {
        callback: function (doc) {
          doc.save("doc");
        }
  }  
 )};
 
  const classes = useStyles();

  return (

    <div style={{display: 'flex'}}>
      {props.numSelected > 0 ? <Button  className={classes.mainButton} variant="outlined" color="primary" onClick={handleClickOpen} >
      View Correspondence
      </Button> : <ThemeProvider theme={theme}><Button disabled className={classes.mainButton} variant="outlined" color="primary" onClick={handleClickOpen} >
      View Correspondence
      </Button></ThemeProvider>}
      
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="lg">
            <DialogTitle style={{backgroundColor: "#2A3E4C", color: "#FFFFFF", position:"relative"}}  id="form-dialog-title" >View Correspondence (2)
            <CloseIcon onClick={handleClose} className={classes.root} variant="outlined" color="primary" style={{paddingLeft:'57vw', marginTop:'2vh'}}/>
            </DialogTitle>
            
            
            <div style={{backgroundColor: "#2A3E4C", color: "#97A1A9", display:'flex'}} >
                
                    <DialogContent className={classes.text}>
                    
                    <Typography>
                    Subject: <span className={classes.spanEdit}>Invoice Details - {setResponseData.name_customer}</span><br/><br/>
                     Dear Sir/Madam, <br/>
                    Greetings! <br/><br/>
                     This is to remind you that there are
                     one or more open invoices on your account. Please provide at your earliest convenience an update on the 
                     ayment details or clarify the reason for the delay. If you have any specific issue with the invoice(s),
                     please let us know so that we can address it to the correct Department.<br/> <br/> 
                     Please find the details of the invoices below:<br/> <br/> 
                     
                    Total Amount to be Paid:  {setResponseData.total_open_amount}<br/><br/>
                    In case you have already made a payment for the above items, please send us the details to ensure the payment is posted. <br/> 
                    Let us know if we can be of any further assistance.
                    Looking forward to hearing from you.<br/>  <br/> 
                    Kind Regards, <br/>
                    <span className={classes.spanEdit}>Adarsh Kumar</span> <br/>
                    Phone : <span className={classes.spanEdit}>+91-852945XXXX</span> <br/>
                    Fax : <span className={classes.spanEdit}>[If any]</span> <br/>
                    Email : <span className={classes.spanEdit}>1805695@kiit.ac.in</span> <br/>
                    Company <span className={classes.spanEdit}>KIIT DU</span><br/>
                    </Typography>
                  
                    </DialogContent>
                
            </div>
        
            <DialogActions style={{backgroundColor: "#2A3E4C"}} >
                <Grid item xs ={6}>
            </Grid>
            <Grid item xs ={6}> 
            <Button onClick={handleClose} className={classes.outlinedButton} variant="outlined" color="primary">
            Cancel
            </Button>
            <Button onClick={print} className={classes.containedButton} variant="contained" color="primary">
                Download
            </Button>
            </Grid>
            </DialogActions>
        </Dialog>
      </div>
    
  );
}
