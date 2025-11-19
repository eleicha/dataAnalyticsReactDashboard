/**
 * backend server.js provides an API endpoint to connect to databricks
 */
// Express is a web application framework for Node.js that simplifies building server-side
// applications and APIs
import express from 'express';
// CORS allows bypassing same origin policy, i.e. allows the application to make calls from
// localhost to localhost
import cors from 'cors';
// used to import configs from .env
import dotenv from 'dotenv';
// node.js databricks connector
import { DBSQLClient } from '@databricks/sql';

// loads .env configs
dotenv.config();

// creates an express app that handles incoming API calls
const app = express();
// tells app to use cors
app.use(cors());
// tells app to use json as inputs
app.use(express.json());

// Gets the port from the .env file
const PORT = process.env.PORT || 4000;

/**
 * API endpoint to connect to databricks and submit a query
 */
app.get('/api/query', async (req, res) => {
    // obtain the query's statement variable from the request
    const { statement } = req.query;

    // throw a 400 error if the body is empty
    if (!statement) {
        return res.status(400).json({ error: 'Missing query parameter "statement"' });
    }

    // obtain token, host, and path to databricks from the .env file
    const token = process.env.DATABRICKS_TOKEN;
    const host = process.env.DATABRICKS_HOST;
    const path = process.env.DATABRICKS_HTTP_PATH;

    // create a new DBSQLClient
    const client = new DBSQLClient();

    // uses a try catch to handle any errors during connection
    try {
        // Connect to Databricks SQL
        await client.connect({
            token,
            host,
            path
        });

        // open a new databricks session
        const session = await client.openSession();

        // Execute the query asynchronously and obtain the results
        const queryOperation = await session.executeStatement(statement, { runAsync: true });
        const result = await queryOperation.fetchAll();
        console.log(result)

        // close the connections asynchronously
        // you need to close all opened connections, i.e., queryOperation, session, and client
        await queryOperation.close();
        await session.close();
        await client.close();

        // Send result back to frontend
        res.json({ data: result });
    } catch (error) {
        // log errors in the console
        console.error('Databricks SQL error:', error);
        // use res.status().json() to return an error via API
        res.status(500).json({ error: 'Failed to fetch data from Databricks' });
    }
});

/**
 * Tells Express to start an HTTP server and listen on the defined port
 */
app.listen(PORT, () => {
    console.log(`✅ Backend running on http://localhost:${PORT}`);
});
