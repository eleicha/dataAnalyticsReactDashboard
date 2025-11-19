# Backend connecting to databricks

### Installation

For the installation run

```
npm install
```

inside the /backend folder

### Run

To run locally on port 4000 run

```
node server.js
```

inside the /backend folder

### ToDos

1. Create a .env file in the backend folder with the database token, server_hostname, and 
   http_path use the .env file in the presentation as reference if needed. To call the variables 
   in your code use

```javascript
process.env.YOUR_VARIABLE_NAME
```

2. Run

```
node -v
```

in the terminal to check that the install node version is >14. This will be the case on the VMs 
but please just make sure

3. Run

```
npm i @databricks/sql
```

to install the databricks sql node.js plugin.

4. Implement server.js using the Databricks SQL node.js Client Example Code in the slides as help.