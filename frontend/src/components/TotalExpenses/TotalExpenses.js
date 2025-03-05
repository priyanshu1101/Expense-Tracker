import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, CircularProgress, Button, Typography } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { DateTime } from "luxon";
import "./TotalExpenses.css";
import { getTotalExpenses } from "../../Api/sequence";
import { toast } from "react-toastify";

const ExpenseSummary = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState(DateTime.now().minus({ days: 1 }).toISODate());
    const [endDate, setEndDate] = useState(DateTime.now().toISODate());

    useEffect(() => {
        if (startDate && endDate) {
            fetchData();
        }
    }, [startDate, endDate]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await getTotalExpenses({ startDate: startDate, endDate: endDate });
            if (response.data.ok) {
                setExpenses(response.data.data);
            }
        } catch (error) {
            toast.error("Error fetching data");
            console.error("Error fetching data", error);
        }
        setLoading(false);
    };

    const handleReset = () => {
        setStartDate("");
        setEndDate("");
        setExpenses([]);
    };

    const totalAmount = expenses.reduce((sum, expense) => sum + expense.totalAmount, 0);

    return (
        <div className="expense-summary-container" style={{ padding: "0px 10%" }}>
            <Typography variant="h3" style={{ fontFamily: "cursive" }} className="expense-summary-title">
                Expense Summary
            </Typography>

            <div className="filter-container">
                <TextField
                    label="Start Date"
                    type="date"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="filter-input"
                />
                <TextField
                    label="End Date"
                    type="date"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="filter-input"
                />
                <Button variant="outlined" style={{ margin: "auto 0px" }} onClick={handleReset} className="reset-button">
                    <RestartAltIcon />
                </Button>
            </div>

            {loading ? (
                <CircularProgress />
            ) : (
                <TableContainer component={Paper} className="table-container">
                    <Table>
                        <TableHead className="table-head" >
                            <TableRow>
                                <TableCell style={{ fontWeight: "bold", fontSize: "1rem" }}>S.No</TableCell>
                                <TableCell style={{ fontWeight: "bold", fontSize: "1rem" }}>Category</TableCell>
                                <TableCell style={{ fontWeight: "bold", fontSize: "1rem" }}>Total Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {expenses.map((expense, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{expense._id}</TableCell>
                                    <TableCell>{expense.totalAmount}</TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell><strong>Total</strong></TableCell>
                                <TableCell><strong>{totalAmount}</strong></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default ExpenseSummary;
