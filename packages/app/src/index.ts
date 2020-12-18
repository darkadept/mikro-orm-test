import 'dotenv/config';
import debug from 'debug';
import {MikroORM, wrap} from '@mikro-orm/core';
import {mikroOrmConfig, entities} from './mikro-orm.config';

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
	const contactRepo = mo.em.getRepository(entities.Contact);

	// Remove existing data
	await contactRepo.nativeDelete({});

	// Create a Contact and and Employee
	const contactCreate = new entities.Contact();
	contactCreate.name = 'My Contact';
	contactCreate.arrayOfObjects = [{one: 'one', two: 2}]

	// Persist entities
	contactRepo.persist(contactCreate);

	// Save the ID's for later
	const contactId = contactCreate.id;

	// Flush and then clear the identity map
	await mo.em.flush();
	mo.em.clear();

	// Find my contact previously created
	const contact = await contactRepo.findOne(contactId);
	if (!contact) throw new Error('no contact found');

	const data = {
		arrayOfObjects: [
			{one: 'ONE', two: 22}
		]
	}

	wrap(contact).assign(data);

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
