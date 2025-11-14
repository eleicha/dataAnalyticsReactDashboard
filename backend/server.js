// backend/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { DBSQLClient } from '@databricks/sql';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// API endpoint to execute a SQL query
app.get('/api/query', async (req, res) => {
    const { statement } = req.query;

    if (!statement) {
        return res.status(400).json({ error: 'Missing query parameter "statement"' });
    }

    const token = process.env.DATABRICKS_TOKEN;
    const host = process.env.DATABRICKS_HOST;
    const path = process.env.DATABRICKS_HTTP_PATH;

    const client = new DBSQLClient();

    try {
        // Connect to Databricks SQL
        await client.connect({
            token,
            host,
            path
        });

        const session = await client.openSession();

        // Execute the query asynchronously
        const queryOperation = await session.executeStatement(statement, { runAsync: true });
        const result = await queryOperation.fetchAll();
        console.log(result)

        await queryOperation.close();
        await session.close();
        await client.close();

        // Send result back to frontend
        res.json({ data: result });
    } catch (error) {
        console.error('Databricks SQL error:', error);
        res.status(500).json({ error: 'Failed to fetch data from Databricks' });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Backend running on http://localhost:${PORT}`);
});
