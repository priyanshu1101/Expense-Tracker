import axios from 'axios';
const baseURL = `/api/expenses`;

const getExpensesBasedOnFilter = ({ date, category, pageNo, pageLimit }) => axios.get(`${baseURL}?date=${date}&category=${category}&pageNo=${pageNo}&limit=${pageLimit}`);
const createExpense = (expense) => axios.post(`${baseURL}/`, expense);
const getTotalExpenses = ({ startDate, endDate }) => axios.get(`${baseURL}/total?start=${startDate}&end=${endDate}`);

export { getExpensesBasedOnFilter, createExpense, getTotalExpenses };