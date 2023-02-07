import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import usersRouter from './routes/users.js';

const PORT = process.env.PORT || 3033;

export const app = express();

mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('DB connected successfully'))
  .catch((err) => console.log('DB error', err));

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CodePen-Clone API',
      version: '1.0.0',
      description: 'Express CodePen-Clone API',
    },
    servers: [
      {
        url: 'https://rs-clone-api.onrender.com',
      },
    ],
  },
  apis: ['./routes/*.js'],
};
const specs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.use(express.json());
app.use(cors());
app.use('/users', usersRouter);

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log(`Server is running on port ${PORT}`);
});
