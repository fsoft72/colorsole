# colorsole

Put colors in your debugging sessions.
By Fabio Rotondo.

## Installation

    yarn add colorsole

or

    npm install --save colorsole


## Usage

```javascript
var Colorsole = require ( 'colorsole' );

// once instantiated, colorsole can be used as a console replacement
console = new Colorsole ();

// There are some options and attributes you can call while creating a Colorsole.

// now just use it with debug, info, warn, error methods
// NOTE: for better results, pass at least two arguments to a colorsole debug method
// the first argument will be used as a line title
console.debug ( "DEBUG", "This is an info message" );
console.info  ( "INFO", "This is an info message" );
console.warn  ( "Warning", "This is an info message" );
console.error ( "ERROR Message", "This is an info message" );
```

## API

### Colorsole ( level = INFO, theme = 'dark', stack = 0, date = 0 )

Parameters during `Colorsole` creations are:

	- level:    Level of output of the Colorsole.
				These are the available values:

					- Colorsole.LOG_LEVEL_DEBUG  : the less important message
					- Colorsole.LOG_LEVEL_INFO   : an informative message  [default]
					- Colorsole.LOG_LEVEL_WARN   : a warning
					- Colorsole.LOG_LEVEL_ERROR  : an error message

	- theme:	Color scheme to be used. At the moment, only `dark` is available.

	- stack: 	Flag T/F. If set to true, the text line shows filename and line number where the message has been written.

	- date:     Flag T/F. If set to true, the text lines shows date (YYYYMMDD format) and time (HHMMSS format) 

You can change the level at runtime using this syntax:

```javascript
// After this line, only error messages will be shown to the console
console.level = Colorsole.LOG_LEVEL_ERROR;
```

Also `stack` and `date` can be toggled at runtime, in this way:

```javascript
// Enable show stack
console.show_stack = true;

// disable date
console.show_date = false;
```

### debug ( ...args )   - writes a debug messate to the console
### info ( ...args )	- writes an info level message to the console
### warn ( ...args )	- writes a warning to the console
### error ( ...args )	- writes an error to the console

## Changelog

0.1.0: First release
