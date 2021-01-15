import {Entity, OneToOne, PrimaryKey, Property} from '@mikro-orm/core';
import {v4} from 'uuid';

@Entity()
export class Contact {
	@PrimaryKey({type: 'uuid'})
	id = v4();

	@Property({type: 'number', version: true})
	version = 1;

	@Property({type: 'string'})
	name!: string;

	@OneToOne('Contact')
	friend!: Contact;
}
