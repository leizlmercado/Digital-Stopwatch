# Digital Stopwatch App

A sleek and modern web-based stopwatch for tracking time and laps.

## Features

- **Time Tracking** The code uses `setInterval` at 10ms intervals to calculate hours, minutes, seconds, and milliseconds based on `Date.now()`.
- **Lap System** The `recordLap()` function creates new `div` elements with a "Lap" number and timestamp, appending them to a scrollable list.
- **Dark & Light Mode** The `themeToggle` listener switches the `data-theme` attribute and saves the choice to `localStorage`.
- **Keyboard Shortcuts** The script includes a `keydown` listener specifically for the `Space` (Start/Stop), `R` (Reset), and `L` (Lap) keys.
- **Responsive Layout** The CSS includes `@media` queries for max-widths of 480px and 360px, and a specific landscape orientation fix for mobile devices.

## How to Run

- Open `index.html` directly in your browser, or
- From the main hub (`index.html` in the root), click the **digital stopwatch** button.


## Keyboard Shortcuts

| Key   |                 Action    |
|------ |                    ------ |
| Space |     Start / Stop the timer|
| L     |              Record a Lap |
| R     | Reset timer and clear laps|


## Files
- `index.html` - Contains the `time-display` spans and the `controls` div for Start, Reset, and Lap buttons.
- `style.css` - Defines variables like `stopwatch-bg` and animations like `pulse` and `slideIn` for the UI.
- `script.js`- Contains the core `updateDisplay`, `toggleStartStop`, and `recordLap` functions.

