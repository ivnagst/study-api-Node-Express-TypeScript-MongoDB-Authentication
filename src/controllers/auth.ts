import express from 'express';

import { getUserByEmail, createUser } from '../db/users';
import { random, auth } from '../helpers/index';

export const register = async (req: express.Request, res: express.Response) => {
	try {
		const { email, password, username } = req.body;

		if (!email || !password || !username) {
			return res.sendStatus(401);
		}
		const existingUser = await getUserByEmail(email);

		if (existingUser) {
			return res.sendStatus(402);
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
		console.log('passou');
		return res.status(200).json(user).end();
	} catch (err) {
		console.log(err);
		return res.sendStatus(403).append;
	}
};

export const login = async (req: express.Request, res: express.Response) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.sendStatus(400);
		}
		const user: any = await getUserByEmail(email).select(
			'+auth.salt +auth.password',
		);
		if (!user) {
			return res.sendStatus(400);
		}
		const expectedHash = auth(user.auth.salt, password);
		if (user.auth.password !== expectedHash) {
			return res.sendStatus(403);
		}

		const salt = random();
		user.auth.sessionToken = auth(salt, user._id.toString());

		await user.save();

		res.cookie('ivn-auth', user.auth.sessionToken, {
			domain: 'localhost',
			path: '/',
		});
		return res.status(200).json(user).end();
	} catch (err) {
		console.error(err);
		return res.sendStatus(400);
	}
};
