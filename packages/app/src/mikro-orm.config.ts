import 'dotenv/config';
import type {Options} from '@mikro-orm/core';
import {PostgreSqlDriver} from '@mikro-orm/postgresql';
import {MyPkgEnt} from 'motest-entities';
import {MyEnt} from './MyEnt';

export const mikroOrmConfig: Options = {
	// metadataProvider: TsMorphMetadataProvider,
	entities: [MyEnt, MyPkgEnt],
	clientUrl: process.env.CLIENTURL,
	type: 'postgresql',
	driver: PostgreSqlDriver,
	debug: true,
	discovery: {
		disableDynamicFileAccess: true,
	},
};
