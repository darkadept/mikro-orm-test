import {Entity, OneToOne, PrimaryKey, Property} from '@mikro-orm/core';
import {v4} from 'uuid';

interface ArrayObjects {
	one: string;
	two: number;
}

@Entity()
export class Contact {
	@PrimaryKey({type: 'uuid'})
	id = v4();

	@Property({type: 'string'})
	name!: string;

	@OneToOne({type: 'JSON'})
	arrayOfObjects!: ArrayObjects[];
}
