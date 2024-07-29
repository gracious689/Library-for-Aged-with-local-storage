import express from "express";
import { PORT } from "./config.js";
import uploadBooks from "./routes/uploadRoutes.js"
import fs from 'fs';

const app = express();
app.use(express.json());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(200).send('Welcome to my library');
});

app.use('/upload', uploadBooks);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
