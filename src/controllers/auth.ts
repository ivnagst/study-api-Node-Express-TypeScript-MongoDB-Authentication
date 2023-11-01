import express from 'express';

import { getUserByEmail, createUser } from '../db/users';
import { random, auth } from '../helpers/index';

export const login = async (req: express.Request, res: express.Response) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.sendStatus(400);
		}
		const user = await getUserByEmail(email).select('+auth.salt +auth.password');
		if (!user) {
			return res.sendStatus(400);
		}
		const expectedHash = auth(user.auth.salt, password);
		if (user.auth.password !== expectedHash){
			return res.sendStatus(403);
		}
	} catch (err) {
		console.error(err);
		return res.sendStatus(400);
	}
};

export const register = async (req: express.Request, res: express.Response) => {
	try {
		const { email, password, username } = req.body;

		if (!email || !password || !username) {
			return res.sendStatus(400);
		}
		const existingUser = await getUserByEmail(email);

		if (existingUser) {
			return res.sendStatus(400);
		}

		const salt = random();
		const user = await createUser({
			email,
			username,
			auth: {
				salt,
				password: auth(salt, password),
			},
		});
		return res.status(200).json(user).end();
	} catch (err) {
		console.error(err);
		return res.sendStatus(400);
	}
};
