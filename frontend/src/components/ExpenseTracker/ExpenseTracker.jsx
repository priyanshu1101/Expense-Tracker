import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import Typography from "@mui/material/Typography";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
    Select,
    MenuItem,
    TextField,
    CircularProgress,
    IconButton,
    Button,
    FormControl,
    InputLabel,
    Pagination,
    Stack
} from "@mui/material";
import "./ExpenseTracker.css";
import AddExpense from "./AddExpense/AddExpense";
import { getExpensesBasedOnFilter } from "../../Api/sequence";
import { toast } from "react-toastify";

const ExpenseTracker = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [addExpenseDataState, setAddExpenseDataState] = useState("Done");

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await getExpensesBasedOnFilter({ category, date, pageNo: page, pageLimit: pageSize });
            if (response.data.ok) {
                setExpenses(
                    response.data.data[0].expenses.map((expense, index) => ({
                        id: (page - 1) * pageSize + index + 1,
                        ...expense,
                    }))
                );
                setTotalCount(response.data.data[0].totalCount);
            }
        } catch (error) {
            toast.error("Error fetching data");
            console.error("Error fetching data", error);
        }
        setLoading(false);
    };

    const resetFilters = () => {
        setDate("");
        setCategory("");
    };

    useEffect(() => {
        if (addExpenseDataState === "Done") {
            fetchData();
        }
    }, [page, pageSize, date, category, addExpenseDataState]);


    return (
        <div className="expense-tracker-container" style={{ padding: "60px 10%" }}>
            <AddExpense open={openModal} onClose={() => setOpenModal(false)} setAddExpenseDataState={setAddExpenseDataState} />
            <Typography variant="h3" className="expense-tracker-title" style={{ fontFamily: "cursive", fontWeight: "initial" }}>
                Expense Tracker
            </Typography>

            <div className="expense-filter-container">
                <div className="filters">
                    <FormControl fullWidth>
                        <InputLabel shrink>Date</InputLabel>
                        <TextField
                            type="date"
                            variant="outlined"
                            fullWidth
                            value={date}
                            onChange={(e) => {
                                setDate(e.target.value)
                                setPage(1)
                            }}
                            InputLabelProps={{ shrink: true }}
                        />
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select
                            variant="outlined"
                            fullWidth
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value)
                                setPage(1)
                            }}
                        >
                            <MenuItem value="">All Categories</MenuItem>
                            <MenuItem value="Food">Food</MenuItem>
                            <MenuItem value="Transport">Transport</MenuItem>
                            <MenuItem value="Entertainment">Entertainment</MenuItem>
                            <MenuItem value="Shopping">Shopping</MenuItem>
                        </Select>
                    </FormControl>

                    <IconButton onClick={resetFilters} color="primary">
                        <RestartAltIcon />
                    </IconButton>
                </div>
                <Button variant="contained" style={{ backgroundColor: "#f2f2f2", color: "black", margin: "0px 0px 8px 0px" }} onClick={() => setOpenModal(true)}>
                    Add Expense
                </Button>
            </div>

            {loading ? (
                <div className="loading-container">
                    <CircularProgress />
                </div>
            ) : (
                <div className="table-container">
                    <table style={{ minHeight: "450px" }}>
                        <thead style={{ backgroundColor: "#f2f2f2" }}>
                            <tr>
                                <th>S.No</th>
                                <th>Amount</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map((expense, index) => (
                                <tr key={index} style={{ maxHeight: "50px" }}>
                                    <td>{expense.id}</td>
                                    <td>{expense.amount}</td>
                                    <td>{expense.category}</td>
                                    <td>{DateTime.fromISO(expense.date).toFormat("d LLLL yyyy")}</td>
                                    <td title={expense.description}>{expense.description}</td>
                                </tr>
                            ))}
                            {Array.from({ length: pageSize - expenses.length }).map((_, index) => (
                                <tr key={index} style={{ maxHeight: "50px" }}>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="pagination-container">
                        <div style={{ width: "100%", display: "flex", justifyContent: "right" }}>
                            <Stack spacing={2} className="pagination-controls" justifyContent={"center"}>
                                <Pagination
                                    count={Math.ceil(totalCount / pageSize)}
                                    page={page}
                                    onChange={(event, value) => setPage(value)}
                                    shape="rounded"
                                    variant="outlined"
                                />
                            </Stack>
                        </div>

                        <div style={{ width: "100%" }}>
                            <div className="page-size-selector" style={{ justifyContent: "right" }} >
                                <label>Limit:</label>
                                <Select
                                    value={pageSize}
                                    onChange={(e) => {
                                        setPageSize(Number(e.target.value));
                                        setPage(1);
                                    }}
                                >
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={20}>20</MenuItem>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExpenseTracker;
