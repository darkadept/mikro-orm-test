import 'dotenv/config';
import type {Options} from '@mikro-orm/core';
import {Contact} from 'motest-entities';

export const entities = {
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
