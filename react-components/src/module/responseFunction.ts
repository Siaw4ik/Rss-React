import { RickMortiResponse, Person } from '../date/types_date';

export async function getDataFromServerSearch(value: string): Promise<Person[]> {
  const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${value}`);
  if (response.status === 404) {
    throw new Error('errors');
  }
  const data: RickMortiResponse = await response.json();
  return data.results;
}

export async function getDataFromServerPerson(id: number): Promise<Person> {
  const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  if (!response.ok) {
    throw new Error('errors');
  }
  const data: Person = await response.json();
  return data;
}
