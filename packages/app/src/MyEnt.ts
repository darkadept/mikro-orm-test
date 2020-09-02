import {v4} from 'uuid';
import {Entity, PrimaryKey, Property} from '@mikro-orm/core';

@Entity()
export class MyEnt {
	@PrimaryKey({type: 'uuid'})
	id = v4();

	@Property({type: 'string'})
	name!: string;
}
