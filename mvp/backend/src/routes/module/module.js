const express = require('express');
const module = express.Router();

const queries = require('./moduleQueries');

module.put('/activate', async (req, res, next) => {
	console.log("/module/activate endpoint reached");
	try{
		const db = req.app.locals.db;
		const {module_name} = req.body;

		if (!module_name){
			const error = new Error('Missing parameters');
			error.name = 'BadRequestError';
			throw error;
		}

		moduleId = await queries.getModuleId(module_name);

		if (!moduleId){
			const error = new Error('Missing parameters');
			error.name = 'BadRequestError';
			throw error;
		}

		if (await queries.activateModule(moduleId))
		{
			res.status(200);
		}
		else
		{
			res.status(500);
		}
	} catch (err){
		next(err);
	}
})

module.put('/disactivate', async (req, res, next) => {
	console.log("/module/activate endpoint reached");
	try{
		const db = req.app.locals.db;
		const {module_name} = req.body;

		if (!module_name){
			const error = new Error('Missing parameters');
			error.name = 'BadRequestError';
			throw error;
		}

		moduleId = await queries.getModuleId(module_name);

		if (!moduleId){
			const error = new Error('Missing parameters');
			error.name = 'BadRequestError';
			throw error;
		}

		if (await queries.desactivateModule(moduleId))
		{
			res.status(200);
		}
		else
		{
			res.status(500);
		}
	} catch (err){
		next(err);
	}
})
