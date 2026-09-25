Do not create one animation and then completely separate code for playable game.
we can have
playCard(card)
moveMarble(steps)
showCard(card)
hideCard()
showWin()
resetGame()

also Do not hold backin creating other files. if necessary create as much file as u need - the importance thing here is to being clean and not overcomplicate things


If U have any qustion about things first ask and then do it do not jump straight into that (but it also do not means that u need to ask anything if u know it just do it)


# Project Instructions

This repository contains a small interactive Brändi DOG branding-wall mini-game built with vanilla HTML, CSS, and JavaScript.

## Project Structure

- `index.html` — game DOM structure
- `style.css` — development/stage layout and positioning tools
- `gameStyle.css` — actual game visuals and animation styles
- `script.js` — game state, interactions, and animations
- `gamerule.md` — gameplay rules and expected behavior
- `assets/` — supplied visual assets

## Rules for Changes

- Read `gamerule.md` when working on gameplay behavior.
- Use existing assets from `assets/` instead of recreating branded visuals with CSS.
- Use HTML/CSS for layout, text, buttons, interaction areas, and UI.
- Keep the project vanilla HTML/CSS/JS unless explicitly asked to add a dependency.
- Keep code simple and easy to modify.
- Avoid unnecessary abstractions.
- Do not rewrite unrelated working code.
- Prefer CSS transforms for movement/animation rather than repeatedly changing `top` and `left`.
- Support pointer/touch interaction.
- Prevent duplicate clicks while an animation is running.
- Keep important gameplay values and positions configurable.
- Reuse animation/game functions instead of duplicating demo and playable logic.

## Development

`style.css` currently contains development-stage helpers such as the grid, coordinates, and positioning guides.

Keep these tools available while developing unless explicitly asked to remove them.

Put game-specific styling and animation in `gameStyle.css`.

Before making a large structural change, inspect the existing implementation first.

