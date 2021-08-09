# Before we start

This is my first time using graphql and styled components, maybe the conventions and best practices aren't there but I enjoyed using them and am eager to learn more.

I'm a pokemon fan so I took some decisions with knowledge about pokemon in hand.

I mapped the stats into an object representing the actual stats of a pokemon. The stats come in an array and that would make it more cumbersome to work with later. Because all pokemon need these stats, I assumed they always were complete in the response.

## Notes

I tried to spend as less time as possible like the instructions said. As such some things are incomplete:

- Styling is missing on the moves part
- Styling is missing on the selected pokemon moves
- The layout is not robust enough and it moves when receiving different data.

Didn't want to use redux or similar approaches. I opted to create a provider with all the data. This solution comes with its own problems that will be listed below in `the ugly` section

# The good, the bad and the ugly

## The good

- Had a lot of fun learning graphql.

- First experience using styled components 'extensively'. I can certainly see the value in them.

## The bad

- Used snapshot testing. Although I don't like using snapshots, I didn't want to overcomplicate things and take more than expected. I would have used enzyme or react-testing-library instead.

- Only tested the normalization functions in the custom hooks. Don't think unit testing the actual hook would bring any value.

- Didn't know if there was a standard way to parse graphql data. I was tempted to use graphql-normalizr, as I'm familiar with the normalizr library. Didn't want to overcomplicate things so I choose to parse the data in the hook manually.

- Didn't know if there was a way to check if the 6 stats (hp, attack, defense, specialAttack, specialDefense, speed) where always available in the result. I assumed they where and mapped all incoming stats.

## The ugly

- The whole part move was done in a rush in order to try and fit everything in three hours.

- If I had more time I would fix the styling so components don't resize so abruptly when changing data.

- Would have loved to finish all styling

- Didn't have time to do the moves tabs. Would have done it with pure HTML/CSS although I don't know if it is easy with styled or not

- The context/provider approach needs some optimization. Because of the way its structured, it reparses the pokemon data each time you select a pokemon. It's not a very costly operation but it could be mitigated with useMemo or a memoize function. Another possible solution would be to keep the current pokemon data outside of this provider and use a second provider or component to store the currentPokemon.
