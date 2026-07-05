const sql = require('mssql');

const dbConfig = {
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD || 'your_password',
    server: process.env.DB_SERVER || 'localhost',
    database: process.env.DB_NAME || 'YourDatabaseName',
    options: {
        encrypt: true, // Use this if you're on Windows Azure
        trustServerCertificate: true // Change to true for local dev / self-signed certs
    }
};

class Database {
    constructor() {
        this.pool = null;
    }

    async connect() {
        try {
            if (this.pool) {
                return this.pool;
            }
            this.pool = await sql.connect(dbConfig);
            console.log('Connected to SQL Server successfully.');
            return this.pool;
        } catch (error) {
            console.error('Database connection failed:', error);
            throw error;
        }
    }

    async getPool() {
        if (!this.pool) {
            await this.connect();
        }
        return this.pool;
    }
}

// Export a singleton instance
module.exports = new Database();
