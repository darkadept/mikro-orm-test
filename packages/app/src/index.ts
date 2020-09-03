import 'dotenv/config';
import debug from 'debug';
import {MikroORM} from 'mikro-orm';
import {Owner, Inverse} from 'motest-entities';
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

	// // Get repositories
	const ownerRepo = mo.em.getRepository(Owner);
	const inverseRepo = mo.em.getRepository(Inverse);

	const o1 = ownerRepo.create({
		name: 'Entity 1',
	});
	console.log(o1.id);
	ownerRepo.persist(o1);
	await mo.em.flush();

	// const o2 = ownerRepo.findOne('')
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
