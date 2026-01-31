async function getModuleId(db, moduleName) {
	const [rows] = await db.execute('SELECT * FROM modules WHERE module_name = ?', [moduleName]);

   	if (rows.length > 0) {
	return rows[0];
	}
}

async function activateModule(db, moduleId) {
    await db.execute('UPDATE modules SET active = 1 WHERE id = ?', [moduleId]);
}

async function activateModule(db, moduleId) {
    await db.execute('UPDATE modules SET active = 0 WHERE id = ?', [moduleId]);
}
