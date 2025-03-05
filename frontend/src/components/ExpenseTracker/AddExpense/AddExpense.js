import React, { useState } from "react";
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";
import "./AddExpense.css";
import { toast } from "react-toastify";
import { createExpense as createExpenseApi } from "../../../Api/sequence";

const AddExpenseModal = ({ open, onClose, setAddExpenseDataState }) => {
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let newErrors = {};

        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            newErrors.amount = "Amount must be a positive number";
        }
        if (amount > 1000000) {
            newErrors.amount = "Amount must be less than 1000000";
        }
        if (!category) {
            newErrors.category = "Category is required";
        }
        if (!date) {
            newErrors.date = "Date is required";
        }
        if (!description.trim()) {
            newErrors.description = "Description is required";
        } else {
            const charCount = description.length;
            if (charCount > 50) {
                newErrors.description = "Description cannot exceed 50 chars";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const newExpense = { amount: parseFloat(amount), category, date, description };

        try {
            setAddExpenseDataState("Loading");
            const response = await createExpenseApi(newExpense);
            setAddExpenseDataState("Done");
            onClose();
            setAmount("");
            setCategory("");
            setDate("");
            setDescription("");
            if (response.data.ok) {
                toast.success("Expense added successfully!!");

            } else {
                toast.error("Failed to add expense");
            }
        } catch (error) {
            toast.error("Failed to add expense");
            console.error("Error submitting expense:", error);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box className="add-expense-container">
                <Typography variant="h4" style={{ fontWeight: "bold" }} className="form-title">
                    Add Expense
                </Typography>

                <form className="add-expense-form" onSubmit={handleSubmit}>
                    <TextField
                        label="Amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        fullWidth
                        error={!!errors.amount}
                        helperText={errors.amount}
                    />

                    <FormControl fullWidth error={!!errors.category}>
                        <InputLabel>Category</InputLabel>
                        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <MenuItem value="Food">Food</MenuItem>
                            <MenuItem value="Transport">Transport</MenuItem>
                            <MenuItem value="Entertainment">Entertainment</MenuItem>
                            <MenuItem value="Shopping">Shopping</MenuItem>
                        </Select>
                        {errors.category && <p className="error-text" style={{ color: "#d32f2f", fontSize: "12px", marginLeft: "10px" }}>{errors.category}</p>}
                    </FormControl>

                    <TextField
                        label="Date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        error={!!errors.date}
                        helperText={errors.date}
                    />

                    <TextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        multiline
                        rows={3}
                        fullWidth
                        error={!!errors.description}
                        helperText={errors.description}
                    />

                    <div className="add-expense-buttons">
                        <Button type="submit" className="submit-btn">
                            Add Expense
                        </Button>
                        <Button onClick={onClose} className="cancel-btn">
                            Cancel
                        </Button>
                    </div>
                </form>
            </Box>
        </Modal>
    );
};

export default AddExpenseModal;
