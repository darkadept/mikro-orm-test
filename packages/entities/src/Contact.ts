import {Entity, JsonType, PrimaryKey, Property} from '@mikro-orm/core';
import {v4} from 'uuid';

interface ArrayObjects {
	one: string;
	two: number;
}

@Entity()
export class Contact {
	@PrimaryKey({type: 'uuid'})
	id = v4();

	@Property({type: 'number', version: true})
	version = 1;

	@Property({type: 'string'})
	name!: string;

	@Property({type: JsonType})
	arrayOfObjects!: ArrayObjects[];
}
