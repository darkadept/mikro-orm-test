import 'dotenv/config';
import type {Options} from '@mikro-orm/core';
import {entities} from './entities';

export const mikroOrmConfig: Options = {
	entities: Object.values(entities),
	clientUrl: process.env.CLIENTURL,
	type: 'postgresql',
	debug: true,
	discovery: {
		disableDynamicFileAccess: true,
	},
};
