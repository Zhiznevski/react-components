import { http, HttpResponse, delay } from 'msw';
import { mockCardResponse } from './mockCardResponse';
import { CHARACTERS } from './Characters';

export const handlers = [
  http.get('https://api.pokemontcg.io/v2/cards/', async () => {
    await delay(150);
    return HttpResponse.json(CHARACTERS);
  }),
  http.get('https://api.pokemontcg.io/v2/cards/hgss4-1', async () => {
    await delay(150);
    return HttpResponse.json(mockCardResponse);
  }),
];
