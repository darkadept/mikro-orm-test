import {v4} from 'uuid';
import {Entity, PrimaryKey, Property} from 'mikro-orm';

@Entity()
export class Inverse {
	@PrimaryKey({type: 'uuid'})
	id = v4();

	@Property({type: 'string'})
	name!: string;
}
