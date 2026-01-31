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

		moduleId = await queries.getModuleId(db ,module_name);

		if (!moduleId){
			const error = new Error('Missing parameters');
			error.name = 'BadRequestError';
			throw error;
		}

		if (await queries.activateModule(db, moduleId))
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

module.put('/desactivate', async (req, res, next) => {
	console.log("/module/activate endpoint reached");
	try{
		const db = req.app.locals.db;
		const {module_name} = req.body;

		if (!module_name){
			const error = new Error('Missing parameters');
			error.name = 'BadRequestError';
			throw error;
		}

		moduleId = await queries.getModuleId(db, module_name);

		if (!moduleId){
			const error = new Error('Missing parameters');
			error.name = 'BadRequestError';
			throw error;
		}

		if (await queries.desactivateModule(db, moduleId))
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

module.get('/activate', async (req, res, next) => {
    console.log("/module/activate endpoint reached");
    try {
        const db = req.app.locals.db;
        const activeModules = await getAllActivated(db); 
		
        res.status(200).json(activeModules);

    } catch (err) {
        next(err);
    }
});

module.get('/desactivate', async (req, res, next) => {
    console.log("/module/desactivate endpoint reached");
    try {
        const db = req.app.locals.db;

        const inactiveModules = await getAllDesactivated(db);

        res.status(200).json(inactiveModules);

    } catch (err) {
        next(err);
    }
});

module.exports = module;
