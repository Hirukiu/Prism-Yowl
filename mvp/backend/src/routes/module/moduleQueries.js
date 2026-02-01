async function getModuleId(db, moduleName) {
	const [rows] = await db.execute('SELECT * FROM modules WHERE module_name = ?', [moduleName]);

   	if (rows.length > 0) {
	return rows[0];
	}
}

async function activateModule(db, moduleId) {
    await db.execute('UPDATE modules SET active = 1 WHERE id = ?', [moduleId]);
}

async function desactivateModule(db, moduleId) {
    await db.execute('UPDATE modules SET active = 0 WHERE id = ?', [moduleId]);
}

async function getAllActivated(db) {
    const [rows] = await db.query('SELECT id, module_name as name FROM modules WHERE active = 1');
    return rows;
}

async function getAllDesactivated(db) {
	const [rows] = await db.query('SELECT id, module_name as name FROM modules WHERE active = 0');
	return rows;
}

module.exports = {

	getModuleId,
	activateModule,
	desactivateModule,
	getAllActivated,
	getAllDesactivated
};
