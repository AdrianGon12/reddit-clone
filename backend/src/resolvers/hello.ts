import { Query, Resolver } from 'type-graphql';

@Resolver()
export class HelloResolver {
  @Query(() => String) // se indica que retorna el query mediante la función
  hello() {
    return 'hello world';
  }
}
