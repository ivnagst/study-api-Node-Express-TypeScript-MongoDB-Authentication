import express from 'express';

import { getUsers, deleteUserById, getUserById } from '../db/users';

export const getAllUsers = async (
	req: express.Request,
	res: express.Response,
) => {
	try {
		const users = await getUsers();

		res.json(users);
	} catch (error) {
		console.error(error);
		res.sendStatus(400);
	}
};

export const deleteUser = async (
	req: express.Request,
	res: express.Response,
) => {
	try {
		const { id } = req.params;
		const deletedUser = await deleteUserById(id);
		res.json(deletedUser);
	} catch (error) {
		console.log(error);
		res.sendStatus(400);
	}
};

export const updateUser = async (
	req: express.Request,
	res: express.Response,
) => {
	try {
		const { id } = req.params;
		const { username } = req.body;

		if (!username) {
			return res.sendStatus(400);
		}

		const user = await getUserById(id);

		if (user) {
			user.username = username;
		}

		await user?.save();

		return res.json(user).end();
	} catch (error) {
		console.log(error);
		return res.sendStatus(400);
	}
};
