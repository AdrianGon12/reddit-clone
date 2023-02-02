import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ObjectType } from 'type-graphql';

@ObjectType() // convierte la clase en un objeto graphql para ser usado
@Entity()
export class Post {
  @Field() // si no se usa field(), ese campo de la tabla no se expone (typeGraphQL)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: 'date' }) // indica que es una columna en la tabla, si eso sería solo una propiedad de la clase (MikrORM)
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field()
  @Property({ type: 'text' })
  title!: string;
}
