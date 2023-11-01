import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';

const PORT = 8080;
const MONGO_URL =
	'mongodb+srv://ivnagst:3Y6qE5rpmwjT8B4e@cluster0.vkv3fi4.mongodb.net/?retryWrites=true&w=majority654159971f7657fac4a15d6e';
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
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router())