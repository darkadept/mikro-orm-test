import {v4} from 'uuid';
import {Entity, OneToOne, PrimaryKey, Property} from 'mikro-orm';
import {Inverse} from './Inverse';

@Entity()
export class Owner {
	@PrimaryKey({type: 'uuid'})
	id = v4();

	@Property({type: 'string'})
	name!: string;

	@OneToOne({type: Inverse})
	myInverse!: Inverse;
}
