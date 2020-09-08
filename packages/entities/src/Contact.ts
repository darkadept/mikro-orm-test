import {v4} from 'uuid';
import {Entity, OneToOne, PrimaryKey, Property} from '@mikro-orm/core';
import {Address} from './Address';

@Entity()
export class Contact {
	@PrimaryKey({type: 'uuid'})
	id = v4();

	@Property({type: 'string'})
	name!: string;

	@OneToOne({type: Address, nullable: true})
	address?: Address;
}
