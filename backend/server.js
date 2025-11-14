import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { DBSQLClient } from "@databricks/sql";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// GET /api/query?statement=SELECT * FROM table
app.get("/api/query", async (req, res) => {
    const sql = req.query.statement;

    if (!sql) {
        return res.status(400).json({ error: "Missing SQL query in ?statement=" });
    }

    try {
        const client = new DBSQLClient();

        // connect to databricks
        await client.connect({
            token: process.env.DATABRICKS_TOKEN,
            host: process.env.DATABRICKS_HOST,
            path: process.env.DATABRICKS_HTTP_PATH,
        });

        // open a session
        const session = await client.openSession();

        // run the query
        const operation = await session.executeStatement({
            statement: sql,
            runAsync: true,
        });

        // fetch results
        const result = await operation.fetchAll();

        // cleanup
        await operation.close();
        await session.close();
        await client.close();

        res.json(result);

    } catch (err) {
        console.error("Databricks query error:", err);
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`🔥 Backend running on http://localhost:${PORT}`);
});
