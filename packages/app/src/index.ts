import 'dotenv/config';
import debug from 'debug';
import {MikroORM} from 'mikro-orm';
import {entities} from 'motest-entities';
import {mikroOrmConfig} from './mikro-orm.config';

const d = debug('motest');
let mo: MikroORM;

/**
 * Main Async Function
 */
async function main() {
	// Initialize MikroORM
	mo = await MikroORM.init(mikroOrmConfig);

	// // Get repositories
	// const myEntRepo = mo.em.getRepository(entities);
	// const myPkgEntRepo = mo.em.getRepository(MyPkgEnt);
	//
	// // Create first entity
	// const e1 = myEntRepo.create({
	// 	name: 'Entity 1',
	// });
	// myEntRepo.persist(e1);
	//
	// // Create second entity
	// const e2 = myPkgEntRepo.create({
	// 	name: 'Entity 2,'
	// });
	// myPkgEntRepo.persist(e2);
	//
	// // Flush data
	// await mo.em.flush();
}

// Execute main function, cleanup when done
main().then(() => {
	mo.close(true).then(() => {
		d('Application complete');
		process.exit(0);
	});
});
