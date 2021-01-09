import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CreateExpense from "./CreateExpense";
import CategoryWise from "./CategoryWise";
import { GlobalContext } from "../../context/GlobalState";
import ExpenseChart from "./ExpenseChart";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Upload from "./Upload";
import moment from 'moment';

function Dashboard() {
  const { expenses } = useContext(GlobalContext);

  const amt = expenses.map((expense) => expense.amount);
  const total = amt.reduce((acc, item) => (acc += item), 0);

  const income = expenses
    .filter((expense) => expense.type === "Income")
    .map((expense) => expense.amount)
    .reduce((acc, item) => (acc += item), 0);

  const expense = expenses
    .filter((expense) => expense.type === "Expense")
    .map((expense) => expense.amount)
    .reduce((acc, item) => (acc += item), 0);

const Balance = income - expense;

  return (
    <div >
    
      <Typography variant="h4" style={{marginBottom:'25px'}}>Dashboard (Balance as on {moment().format('DD-MM-yyyy')})</Typography>
      
      <Grid container>           
        <Grid item xs={3}>
          <Typography variant="h5">
            <ArrowUpwardIcon style={{ fontSize: 20, color: "green" }} />
            <span style={{color:"green", fontWeight:'bold'}}>₹ {income.toFixed(2)}</span>
          </Typography>
          <span style={{ fontSize: 20 }}>Income</span>
        </Grid>
        
        <Grid item xs={3}>
          <Typography variant="h5">
            <ArrowDownwardIcon style={{ fontSize: 20, color: "red" }} /><span style={{color:"red", fontWeight:'bold'}}>₹ {expense.toFixed(2)}</span>
          </Typography>
          <span style={{ fontSize: 20 }}>Expense</span>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="h5">
            {Balance<=0?<ArrowDownwardIcon style={{ fontSize: 20, color: "red" }} />:<ArrowUpwardIcon style={{ fontSize: 20, color: "green" }} />}
             <span style={ Balance<0?{fontSize: 20, fontWeight: 'bold', color:'red'}:{fontSize: 20, fontWeight: 'bold', color:'green'}}>₹ {Balance.toFixed(2)}</span>
          </Typography>
          <span style={{ fontSize: 20, fontWeight: 'bold' }}>Cash-In-Hand as on ({moment().format('DD-MM-yyyy')})</span>
        </Grid>
        
      </Grid>
      <CategoryWise/>      
      <ExpenseChart income={income} expense={expense} />
    </div>
  );
}

export default Dashboard;
