const app = require("./app");
const dotenv = require("dotenv"); 
const connectDatabase = require("./config/database");

//Handling uncaught exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to uncaught exception");
    process.exit(1);
    });


//Config
dotenv.config({path: "backend/config/config.env"});

//connecting to database
connectDatabase();

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});


//Unhandles Promise Rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    //close server and exit process
    console.log(`Shutting down the server due to unhandles promise rejection`);
    server.close(()=>{
        process.exit(1);
    });
   
});
