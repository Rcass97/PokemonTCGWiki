import { PokemonTCG } from "pokemon-tcg-sdk-typescript";

export async function item(id: string) { //finding a single card by id, returns single card by it's id
  try {
    const response = PokemonTCG.findCardByID(id)
      .then(card => {
        return card
      });

    const card = await response;

    return card;

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export async function set(id: string) { //finding a single set by id
  try {
    const response = PokemonTCG.findSetByID(id)
      .then(set => {
        return set
      });

    const set = await response;

    return set;

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export async function specificSet(id: string) { //returns all cards in a set, orders by card number
  try {

    let params: PokemonTCG.Parameter = { q: `id:${id}`, orderBy:'number'};

    const response = PokemonTCG.findCardsByQueries(params)
      .then(allCards => {
      return allCards
    });

    const allCards = await response;

    return allCards;

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export async function allSets() { //returns all exisiting sets
  try {
    const response = PokemonTCG.getAllSets()
      .then(allSets => {
        return allSets
      });

    const allSets = await response;

    return allSets;

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export async function homeCards(id: string) { //returns the first 30 cards from specified set from API, used for HomeScreen
  try {

    let params: PokemonTCG.Parameter = {q: `set.id:${id}`, pageSize: 10, page: 22};

    const response = PokemonTCG.findCardsByQueries(params)
      .then(randomCards => {
      return randomCards
    });

    const randomCards = await response;

    return randomCards;

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export async function searchCards(keywords?: string) {
  try {

    let params: PokemonTCG.Parameter = { q: 'name:' + keywords, orderBy:'releaseDate' };
    if (keywords) {
      const response = PokemonTCG.findCardsByQueries(params)
        .then(randomCards => {
          return randomCards
        });
      const randomCards = await response;

      return randomCards;
    }

    return [];

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}