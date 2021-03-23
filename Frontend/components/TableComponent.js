import React, { useEffect } from "react";
import axios from 'axios';
import { makeStyles, Paper, Typography, withStyles, Button, Grid, TextField, InputAdornment, Icon, Table, TableHead, TableRow, TableCell, TableBody, TableContainer } from "@material-ui/core";
import InfiniteScroll from 'react-infinite-scroll-component';
import Add from "../components/Add";
import Edit from "../components/Edit";
import Delete from "../components/Delete";
import Viewcorres from "../components/ViewCorres";
import SearchIcon from '@material-ui/icons/Search';
import Checkbox from '@material-ui/core/Checkbox';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    action: {
      disabled: '#ffffff',
      disabledBackground: '#97A1A9',
    }
  }
})

const SearchField = withStyles({
    root: {
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#356680",
        },
        "&:hover fieldset": {
          borderColor: "#269fd3",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#14AFF1",
        },
      },
      "& .MuiInputLabel-root": {
        color: "#97A1A9",
      }
    }
  })(TextField);
 
  
const styles = makeStyles(() => ({
    coloredButton: {
      color: "#ffffff",
      backgroundColor: "#14AFF1",
      fontFamily: "normal normal normal 20px/24px Ubuntu",
      fontSize: "1rem",
      borderRadius: "8px",
      textTransform: "None",
      height: "2.3rem",
      marginRight: "1.1vw",
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
      marginRight: "1vw",
      "&:hover": {
        backgroundColor: "#14AFF1",
      },
    },
    disabledButton: {
      fontFamily: "normal normal normal 20px/24px Ubuntu",
      fontSize: "1rem",
      borderRadius: "8px",
      textTransform: "None",
      height: "2.3rem",
      marginRight: "1.1vw",
    },
    table: {
      marginLeft: "1.2vw",
      marginRight: "1vw",
      marginBottom: " 1vh",
      width: "94.5vw",

    }
  }));

function TableComponent(){
  let [responseData, setResponseData] = React.useState([]);
  let [isNext, isNextFunc] = React.useState(false);
  let [pageCount, setCount] = React.useState(1);

  useEffect(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/1805695/fetch?page=${pageCount}&limit=10`
      );
      console.log(response.data);
      setResponseData([...responseData, ...response.data]);
      isNextFunc(true);
    } catch (error) {
      console.log(error);
    }
  }, [pageCount]);

  function fetchMoreData() {
    setCount(pageCount + 1);
  }
   
    const [selected, setSelected] = React.useState([]);
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelecteds = responseData.map((n) => n.invoice_id);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    };

    const handleClick = (event, invoice_id) => {
      const selectedIndex = selected.indexOf(invoice_id);
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, invoice_id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
  
      setSelected(newSelected);
    };
    console.log(selected);
    const isSelected = (invoice_id) => selected.indexOf(invoice_id) !== -1;
    const classes = styles();

    var date = new Date();
    return(
      <Grid container direction="column" md={12} lg={12} style={{padding: '1.5vw'}}>
        <Grid item>
          <Typography variant="h6" style={{color:"white", paddingBottom: '2vh'}}>
            Invoice List
          </Typography>
        </Grid>
        <Grid item>
          <Paper style={{background: '#273D49CC 0% 0% no-repeat padding-box', borderRadius: '0px', height: "77vh"}}>
            <Grid container md={12} lg={12} style={{padding: '1vw'}}>
              <Grid container>
                <Grid item>
                {selected.length > 0 ? <Button  className={classes.coloredButton} variant="contained" color="primary">
                Predict
                </Button> : <ThemeProvider theme={theme}> <Button disabled className={classes.disabledButton} variant="contained" color="primary">
                Predict
                </Button>
                </ThemeProvider>}
                </Grid>
                <Grid item>
                  <Viewcorres  numSelected={selected.length} selectedRow={selected}/>
                </Grid>
                <Grid item style={{marginLeft: 'auto'}}>
                  <Add numSelected={selected.length}/>
                </Grid>
                <Grid item>
                  <Edit numSelected={selected.length} selectedRow={selected[0]}/>
                </Grid>
                <Grid item>
                  <Delete  numSelected={selected.length} selectedRow={selected[0]}/>
                </Grid>
                <Grid item>
                  <SearchField label="Search by invoice number" variant="outlined" style={{paddingLeft: "2vh", borderColor:"#356680", borderRadius: "8px", textTransform: "None",}}
                    InputProps={{style: { color: "white", paddingBottom: "5vh", width:"15vw", height:"5vh" }}}/>
                </Grid>                                    
              </Grid>                 
            </Grid>
   
            <div id="scrollableDiv" style={{ height: 500, overflow: "auto" }}>
              <InfiniteScroll dataLength={responseData.length}
                              next={fetchMoreData}
                              hasMore={isNext}
                              loader={
                                 <h4>Loading</h4>
                              }
                              scrollableTarget="scrollableDiv"
              > 
                            
              <Table stickyHeader aria-label="sticky table" className={classes.table}>
              
                <thead>
                  <tr>
                        <TableCell padding="checkbox"> <Checkbox
            onChange={handleSelectAllClick}
            inputProps={{ 'aria-label': 'select all invocies' }}
            /></TableCell>
                        <TableCell style={{color:'#97A1A9'}}>Customer Name</TableCell>
                        <TableCell style={{color:'#97A1A9'}}>Customer Number</TableCell>
                        <TableCell style={{color:'#97A1A9'}}>Bill Number</TableCell>
                        <TableCell style={{color:'#97A1A9'}}>Bill Amount</TableCell>
                        <TableCell style={{color:'#97A1A9'}}>Due Date</TableCell>
                        <TableCell style={{color:'#97A1A9'}}>Predicted Payment Date</TableCell>
                        <TableCell style={{color:'#97A1A9'}}>Predicted Aging Bucket</TableCell>
                        <TableCell style={{color:'#97A1A9'}}>Notes</TableCell>
                                            
                  </tr>
                </thead>  
              
                <tbody>
                  {responseData.map((data) => 
                  (
                                     
                    <tr
                      hover
                      onClick={(event) => handleClick(event, data.invoice_id)}
                      role="checkbox"
                      aria-checked={ isSelected(data.invoice_id)}
                      tabIndex={-1}
                      key={data.invoice_id}
                      selected={isSelected(data.invoice_id)}
                    > 
                    
                      <TableCell  padding="checkbox"><Checkbox checked={isSelected(data.invoice_id)} style={{color:'white'}}></Checkbox></TableCell>
                      <TableCell style={{color:'white'}}>{data.name_customer}</TableCell>
                      <TableCell style={{color:'white'}}>{data.cust_number}</TableCell>
                      <TableCell style={{color:'white'}}>{data.invoice_id}</TableCell>
                      <TableCell style={{color:'white'}}>{(data.total_open_amount/1000).toFixed(2)}K</TableCell>
                      <TableCell style={{color:'white'}}>{data.due_in_date}</TableCell>
                      <TableCell align="center" style={{color:'white'}}>--</TableCell>
                      <TableCell align="left" style={{color:'white'}}>--</TableCell>
                      <TableCell style={{color:'white'}}>Lorem ipsum dolor...</TableCell>
                     
                     </tr>
                    ))}
                            
                </tbody>
                
              </Table>
                           
                            
              </InfiniteScroll>
            </div>    
          </Paper>
        </Grid>
      </Grid>    
    );
  }
export default TableComponent;