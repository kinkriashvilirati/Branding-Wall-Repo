# Brändi DOG Mini-Game Rules

## Goal

Create a short Brändi DOG-inspired mini-game for a branding wall.

The player uses cards to move a game piece along a predefined path and tries to reach the finish before time runs out.

This is a simplified advertising mini-game, not a full recreation of Brändi DOG.

---

## Game Flow

Game states:

```text
IDLE
STARTING
PLAYING
WIN
GAME_OVER
```

### IDLE

- Show board, player piece, branding, and Play CTA.
- Gameplay is inactive.

### STARTING

Reset:

- player position
- timer
- cards
- animations
- temporary state

Then start the game.

### PLAYING

- Show a card.
- Player clicks/taps the card.
- Card value determines movement distance.
- Animate the piece along the predefined board path.
- Show the next card after movement finishes.
- Continue until the player reaches the finish or time runs out.

### WIN

The player wins when:

```js
currentPosition >= finishPosition
```

Then:

- stop the timer
- disable gameplay input
- play win animation
- show end screen
- show Replay and CTA

### GAME_OVER

If the timer reaches `0` before the finish:

- stop gameplay
- disable input
- show game-over screen
- allow Replay

---

## Card Movement

Normal cards move the piece forward by their value.

Example:

```text
2 -> +2
5 -> +5
10 -> +10

Ace -> +1
Jack -> +11
Queen -> +12
King -> +13
```

Joker can use a custom bonus movement defined in configuration.

Exact card rules may be adjusted later.

---

## Board Movement

The board uses predefined path positions.

Example:

```text
0 -> 1 -> 2 -> 3 -> ... -> finish
```

Store the player's current path index:

```js
currentPosition
```

Example:

```text
currentPosition = 4
card = 3
newPosition = 7
```

The piece should animate between positions.

If movement goes beyond the finish, stop at the finish.

---

## Input Rules

Support:

- mouse click
- touch

Do not depend on hover.

While the piece is moving:

```js
isAnimating = true
```

Ignore additional input.

When movement finishes:

```js
isAnimating = false
```

Only one card/movement can be processed at a time.

---

## Timer

Recommended starting duration:

```text
15 seconds
```

Start the timer when `PLAYING` begins.

Stop it when:

- player wins
- timer reaches 0
- game is reset

---

## Replay

Replay must work without refreshing the page.

Reset all gameplay state including:

- player position
- timer
- current card
- animations
- interaction locks
- timeouts
- intervals
- temporary DOM elements

Do not create duplicate event listeners when replaying.

---

## Configuration

Keep adjustable values centralized.

Example:

```js
const GAME_CONFIG = {
  duration: 15,
  startPosition: 0,
  finishPosition: 20,
  movementDuration: 400
};
```

Do not scatter gameplay constants throughout the code.

---

## Technical Rules

- Keep game state separate from animations.
- Prevent double clicks/taps.
- Clear timers when restarting.
- Do not reload the page.
- Support responsive branding-wall dimensions.
- Prefer container-relative positioning over fixed screen coordinates.
- Reuse provided Brändi DOG assets.
- Keep dependencies minimal.
- Do not implement multiplayer, networking, leaderboards, or full official Brändi DOG rules unless explicitly requested.

---

## Core Interaction

```text
PLAY
  ↓
Show Card
  ↓
Click / Tap Card
  ↓
Move Piece
  ↓
Check Finish
  ↓
Next Card
```

The game should be immediately understandable:

**Click card → move piece → reach finish.**