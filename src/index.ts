import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';

const PORT = 8080;
const MONGO_USERNAME = 'ivnagst';
const MONGO_PASSWORD = '3Y6qE5rpmwjT8B4e';
const MONGO_CLUSTER = 'cluster0.vkv3fi4.mongodb.net';
const MONGO_DATABASE = 'majority654159971f7657fac4a15d6e'; // Substitua pelo nome do seu banco de dados
const MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}/${MONGO_DATABASE}?retryWrites=true&w=majority`;

const app = express();

app.use(
	cors({
		credentials: true,
	}),
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});

mongoose.Promise = Promise;
mongoose.connect(MONGO_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/', router());
