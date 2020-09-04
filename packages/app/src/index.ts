import 'dotenv/config';
import debug from 'debug';
import {MikroORM} from 'mikro-orm';
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
	const addressRepo = mo.em.getRepository(entities.Address);
	const employeeRepo = mo.em.getRepository(entities.Employee);

	// Remove existing data
	contactRepo.remove({});
	addressRepo.remove({});
	employeeRepo.remove({});

	// Create a Contact and and Employee
	const contactCreate = contactRepo.create({
		name: 'My Contact',
	});
	const employeeCreate = employeeRepo.create({
		name: 'My Employee',
	});
	// Assign the created contact to the employee
	employeeCreate.contact = contactCreate;

	// Persist entities
	contactRepo.persist(contactCreate);
	employeeRepo.persist(employeeCreate);

	// Save the ID's for later
	const contactId = contactCreate.id;
	const employeeId = employeeCreate.id;

	// Flush and then clear the identity map
	await mo.em.flush();
	mo.em.clear();

	// Find my contact previously created
	const contact = await contactRepo.findOne(contactId);
	if (!contact) throw new Error('no contact found');

	// Create a new address and persist it
	const address = addressRepo.create({
		name: 'My Address',
	});
	addressRepo.persist(address);

	// Assign the created address to the contact
	contact.address = address;

	// Find my previously created employee
	const employee = await employeeRepo.findOne(employeeId); // This line causes the error!
	if (!employee) throw new Error('no employee found');

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
