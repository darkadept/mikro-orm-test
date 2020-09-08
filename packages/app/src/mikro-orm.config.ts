import 'dotenv/config';
import type {Options} from '@mikro-orm/core';
import {Employee, Address, Contact} from 'motest-entities';

export const entities = {
	Employee,
	Address,
	Contact,
}

export const mikroOrmConfig: Options = {
	entities: Object.values(entities),
	clientUrl: process.env.CLIENTURL,
	type: 'postgresql',
	debug: true,
	discovery: {
		disableDynamicFileAccess: true,
	},
};
