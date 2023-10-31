import { PokemonTCG } from "pokemon-tcg-sdk-typescript";

export async function item(id: string) {
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

export async function set(id: string) {
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

export async function AllItems(id) {
  try {

    // let params: PokemonTCG.Parameter = { pageSize: 40, page: 6 };
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