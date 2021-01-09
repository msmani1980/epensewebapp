import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Tooltip from '@material-ui/core/Tooltip';
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormHelperText from "@material-ui/core/FormHelperText";
import { GlobalContext } from "../../context/GlobalState";
import moment from "moment";

const CategoryData = [{
  type: 'expense', 
  description: 'Temple கோவில் '},{
  type: 'expense', 
  description: 'Tablets'}, {
  type: 'expense', 
  description: 'Non-Veg ஆசைவம் '}, {
  type: 'expense', 
  description: 'Veg காய்கனி '}, {
  type: 'expense', 
  description: 'Maligai மளிகை '}, {
  type: 'expense', 
  description: 'Ghee'}, {
  type: 'expense', 
  description: 'Gingelly Oil'}, {
  type: 'expense', 
  description: 'Sunflower Oil'}, {
  type: 'expense', 
  description: 'Samy சாமி  Oil'}, {
  type: 'expense', 
  description: 'Meals சப்பாட்டு  Rice'}, {
  type: 'expense', 
  description: 'idlly இட்லி  Rice'}, {
  type: 'expense', 
  description: 'Sugar ஜினி '}, {
  type: 'expense', 
  description: 'Tea '}, {
  type: 'expense', 
  description: 'Coffee'}, {
  type: 'expense', 
  description: 'Petrol'}, {
  type: 'expense', 
  description: 'Cylinder'},, {
  type: 'expense', 
  description: 'Acting Driver'}, {
  type: 'expense', 
  description: 'Recharge'}, {
  type: 'expense', 
  description: 'Recharge ரீசார்ஜ் Internet'}, {
  type: 'income', 
  description: 'salary'}, {
  type: 'income', 
  description: 'senthil'}, {
  type: 'income', 
  description: 'senthil mama interest'},, {
  type: 'income', 
  description: 'tamilselvam income'}, {
  type: 'income', 
  description: 'cashinhand'}, {
  type: 'income', 
  description: 'others'}, {
  type: 'expense', 
  description: 'Avain Milk'}, {
  type: 'expense', 
  description: 'Milk'}, {
  type: 'expense', 
  description: 'Water'} ]
  

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    paddingLeft: "240px",
  },
  content: {
    padding: theme.spacing(3),
  },
  fab: {
    position: "fixed",
    right: theme.spacing(5),
    bottom: theme.spacing(6),
  },
  textFieldStyle: {
    paddingBottom: theme.spacing(2),
  },
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  }
}));

function CreateExpense() {
  const classes = useStyles();

  const initialState = {
    open: false,
    expenditure: {
      type: "Expense",
      amount: 0,
      date: moment().format('yyyy-MM-DD'),
      category: "",
      desc: "",
    },
    amtError: "",
    categoryError: "",
  };
  // const [open, setOpen] = useState(false);
  const { addExpenses } = useContext(GlobalContext);

  const [expense, setExpense] = useState(initialState);

  function handleClickOpen() {
    setExpense(() => {
      return {
        open: !expense.open,
        expenditure: {
          type: "Expense",
          amount: 0,
          date: moment().format('yyyy-MM-DD'),
          category: "",
          desc: "",
        },
      };
    });
  }
 const [value, setValue] = React.useState(CategoryData[0].description);
  const [inputValue, setInputValue] = React.useState('');
  // const [list,listItem]=useState([]);

  const handleChange = (e) => {

    const { name, value } = e.target;
    setExpense((prev) => {
      return {
        open: true,
        expenditure: { ...prev.expenditure, [name]: value },
      };
    });
  };

  const validate = () => {
    const { type, amount } = expense.expenditure;
    let amtError = "";
    let categoryError = "";

    if (!category) categoryError = "Category is required.";

    if (!amount) amtError = "Amount is required.";
    else if (amount <= 0) amtError = "Amount must be greater than 0.";

    if (amtError || categoryError) {
      setExpense({
        open: true,
        expenditure: {
          type,
          amount,
          date,
          category,
          desc,
        },
        amtError,
        categoryError,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // listItem((pre)=>{
    //   return [...pre,expense]
    // });
    const isValid = validate();
    const { open, expenditure, amtError, categoryError } = expense;

    if (isValid) {
      expenditure.amount = expenditure.amount * 1;

      addExpenses(expenditure);

      //resetting the values
      setExpense(initialState);
    }
  };
  const {
    open,
    expenditure: { type, amount, date, category, desc },
    amtError,
    categoryError,
  } = expense;

  return (
    <div className={classes.root}>
      <div className={classes.content}>
      <Tooltip title="Add Expense" >
        <Fab
          color="secondary"
          className={classes.fab}
          onClick={handleClickOpen} >
          <AddIcon />
        </Fab></Tooltip>
        <Dialog
          open={open ? open : false}
          onClose={handleClickOpen}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Create Expense</DialogTitle>
          <DialogContent>
            <form autoComplete="off">
            <FormControl
                fullWidth
                variant="outlined"
                className={classes.textFieldStyle}
              >
                <InputLabel htmlFor="type" color="secondary">
                  Enter Type
                </InputLabel>
                <Select
                  name="type"
                  onChange={handleChange}
                  value={type ? type : ""}
                  label="Enter Type"
                  color="secondary"
                >
                  <MenuItem value="Income">Income</MenuItem>
                  <MenuItem value="Expense">Expense</MenuItem>
                </Select>
              </FormControl>
            <TextField
                margin="dense"
                name="date"
                type="date"
                onChange={handleChange}
                value={date ? date : moment().format('yyyy-MM-DD')}
                variant="outlined"
                color="secondary"
                fullWidth
                className={classes.textFieldStyle}
              />
              
              
              <FormControl
                fullWidth
                className={classes.textFieldStyle}
                variant="outlined"
                error={true ? categoryError : null}
              >
                 
    
   
                <Autocomplete
      
      
      
      fullWidth
      options={CategoryData.filter(data=>data.type.toLowerCase()===type.toLowerCase())}
      classes={{
        option: classes.option,
      }}
      autoHighlight
      getOptionLabel={(option) => option.description}
      renderOption={(option) => (
        <React.Fragment>          
          <span style={{fontWeight: 'bold'}}>{option.description}</span> ({option.type})
        </React.Fragment>
      )}
       
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a category"
          variant="outlined"
          name='category'
          onBlur={handleChange}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
               
                <FormHelperText style={{ fontSize: "15px" }}>
                  {categoryError || `Eg. CashinHand, Temple, House`}
                </FormHelperText>
              </FormControl>
             
              <FormControl
                fullWidth
                className={classes.textFieldStyle}
                variant="outlined"
                error={true ? amtError : null}
              >
                <InputLabel color="secondary">Enter Amount</InputLabel>
                <OutlinedInput
                  // margin="dense"
                  name="amount"
                  type="number"
                  onChange={handleChange}
                  value={amount ? amount : ""}
                  label="Enter Amount"
                  color="secondary"
                />
                <FormHelperText style={{ fontSize: "15px" }}>
                  {amtError}
                </FormHelperText>
              </FormControl>
              <TextField
                margin="dense"
                name="desc"
                type="string"
                onChange={handleChange}
                multiline
                rowsMax={4}
                value={desc ? desc : ""}
                label="Add note"
                variant="outlined"
                color="secondary"
                fullWidth
                className={classes.textFieldStyle}
              /> 

            </form>
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default CreateExpense;
