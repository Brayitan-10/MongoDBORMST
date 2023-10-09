import express from "express";
import cors from "cors";
import { dbConnect } from "./src/db.js";
import { router } from "./src/routes/index.routes.js";
import { requestLogger } from "./src/middleware/logger.js";
import { unknowunEnpoint } from "./src/middleware/unknownEnpoint.js";
import { errorHandler } from "./src/middleware/errorHandler.js";


const server = express();
const PORT = 3000;

// Middlewares
server.use(express.json());
server.use(cors());
server.use(requestLogger);


// localhost:3000/api
server.use('/api', router);

server.use(unknowunEnpoint);
server.use(errorHandler);

async function main() {
  try {
    // Conecto la db
    await dbConnect();

    // Levanto el servidor
    server.listen(PORT, () => {
      console.log(`Server Up in http://localhost:${PORT}`);
    });
  } catch (error) {
    console.erro('Error: ', error.message);
  }
}

main();
