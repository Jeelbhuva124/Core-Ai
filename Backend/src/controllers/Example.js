const sql = require('mssql');
const db = require('../config/db');

// Helper to execute SP and handle errors consistently
const executeSP = async (action, params) => {
    try {
        const pool = await db.getPool();
        const request = pool.request();

        // Add parameters
        request.input('Action', sql.VarChar(20), action);

        // Add your SP parameters here
        // if (params.id !== undefined) request.input('id', sql.Int, params.id);
        // if (params.name !== undefined) request.input('name', sql.VarChar(100), params.name);

        const result = await request.execute('USP_Example_Operations');
        return result.recordset || [];

    } catch (error) {
        if (error.number === 50000) {
            const customError = new Error(error.message);
            customError.statusCode = 400;
            throw customError;
        }
        error.statusCode = 500;
        throw error;
    }
};

const getAll = async (req, res) => {
    try {
        const items = await executeSP('SELECT', {});
        res.status(200).json(items);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const getById = async (req, res) => {
    try {
        const items = await executeSP('SELECT_BY_ID', { id: req.params.id });
        if (items.length === 0) {
            return res.status(404).json({ error: 'Record not found' });
        }
        res.status(200).json(items[0]);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const create = async (req, res) => {
    try {
        const result = await executeSP('INSERT', req.body);
        res.status(201).json({ message: 'Record created successfully', data: result[0] });
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const update = async (req, res) => {
    try {
        const result = await executeSP('UPDATE', { id: req.params.id, ...req.body });
        res.status(200).json({ message: 'Record updated successfully', data: result[0] });
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

const remove = async (req, res) => {
    try {
        const result = await executeSP('DELETE', { id: req.params.id });
        res.status(200).json({ message: 'Record deleted successfully', data: result[0] });
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message || 'Internal Server Error' });
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};
