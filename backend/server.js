const app = require("./app");

const { poolPromise } = require("./src/config/db");
const initializeDatabase = require("./src/config/initDatabase");


async function startServer(){

    await poolPromise;

    await initializeDatabase();


    const PORT = process.env.PORT || 5000;


    app.listen(PORT,()=>{
        console.log(`Server running on port ${PORT}`);
    });

}


startServer();