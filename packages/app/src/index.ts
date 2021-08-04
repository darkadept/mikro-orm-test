import 'dotenv/config';
import debug from 'debug';
import {MikroORM} from '@mikro-orm/core';
import {entities} from './entities';
import {mikroOrmConfig} from './mikro-orm.config';

const d = debug('motest');
let mo: MikroORM;

process.on('unhandledRejection', err => {
	console.log('\x1b[1m\x1b[31m[error] Unhandled Rejection\x1b[0m');
	console.log(err);
	process.exit(1);
});

process.on('uncaughtException', err => {
	console.log('\x1b[1m\x1b[31m[error] Uncaught Exception\x1b[0m');
	console.log(err);
	process.exit(1);
});

/**
 * Main Async Function
 */
async function main() {
	// Initialize MikroORM
	mo = await MikroORM.init(mikroOrmConfig);

	// Get repositories
	const myEntRepo = mo.em.getRepository(entities.MyEnt);
	const myPkgEntRepo = mo.em.getRepository(entities.MyPkgEnt);

	// Create first entity
	const e1 = myEntRepo.create({
		name: 'Entity 1',
	});
	myEntRepo.persist(e1);

	// Create second entity
	const e2 = myPkgEntRepo.create({
		name: 'Entity 2,'
	});
	myPkgEntRepo.persist(e2);

	// Flush data
	await mo.em.flush();
}

// Execute main function, cleanup when done
main().then(() => {
	mo.close(true).then(() => {
		d('Application complete');
		process.exit(0);
	});
}).catch(err => {
	console.log('\x1b[1m\x1b[31m[error] Caught Error\x1b[0m');
	console.log(err);
	process.exit(1);
});
