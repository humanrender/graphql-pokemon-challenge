## Before we start

I'm a pokemon fan so I took some decisions with knowledge about pokemon in hand.

I mapped the stats into an object representing the actual stats of a pokemon. The stats come in an array and that would make it more cumbersome to work with later. Because all pokemon need these stats, I assumed they always were complete in the response.

## The bad

- Didn't know if there was a standard way to parse graphql data. I was tempted to use graphql-normalizr, as I'm familiar with the normalizr library. Didn't want to overcomplicate things so I choose to parse the data in the hook manually.

- Didn't know if there was a way to check if the 6 stats (hp, attack, defense, specialAttack, specialDefense, speed) where always available in the result. I assumed they where and mapped all incoming stats.
