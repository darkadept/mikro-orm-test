import {v4} from 'uuid';
import {Entity, OneToOne, PrimaryKey, Property} from 'mikro-orm';
import {Contact} from './Contact';

@Entity()
export class Employee {
	@PrimaryKey({type: 'uuid'})
	id = v4();

	@Property({type: 'string'})
	name!: string;

	@OneToOne({type: Contact, nullable: true})
	contact?: Contact;
}
