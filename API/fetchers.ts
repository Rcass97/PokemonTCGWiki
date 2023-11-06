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

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export async function homeCards(id: string) { //returns 30 random cards from specified set from API, used for HomeScreen
  try {

    let params: PokemonTCG.Parameter = {q: `id:${id}`, pageSize: 30};

    const response = PokemonTCG.findCardsByQueries(params)
      .then(randomCards => {
      return randomCards
    });

    const randomCards = await response;

    const shuffledCards = shuffleArray(randomCards);

    return shuffledCards;

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}