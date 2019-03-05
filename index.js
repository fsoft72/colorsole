const col = require ( "./colors" ).colors;

const themes = {
	dark: {
		error: {
			title: col.BgRed + col.FgWhite,
			text:  col.Reset + col.FgRed
		},
		warn: {
			title: col.BgMagenta + col.FgWhite,
			text:  col.Reset + col.FgMagenta
		},
		info: {
			title: col.BgBlue + col.FgWhite,
			text:  col.Reset + col.FgLightBlue
		},
		debug: {
			title: col.BgGreen + col.FgWhite,
			text:  col.Reset + col.FgLightGray
		}
	}
};

const LOG_LEVEL_DEBUG = 0;
const LOG_LEVEL_INFO  = 10;
const LOG_LEVEL_WARN  = 20;
const LOG_LEVEL_ERROR = 30;

class Colorsole
{
	constructor ( level = LOG_LEVEL_INFO, theme = 'dark', stack = 0, date = 0 ) 
	{
		this.level = level;
		this.theme = theme;
		this.show_stack = stack;
		this.show_date  = date;
	};

	_out ( mode, res, stack = 0, date = 0 ) 
	{
		const _c = themes [ this.theme ] [ mode ];

		res.splice ( 0, 0, _c.title );
		res.splice ( 2, 0, _c.text );

		if ( this.show_stack )
		{
			const st = this._stack ();
			res.splice ( 0, 0, col.BgBlack + col.FgLightGray + st.comp );
		}

		if ( this.show_date )
		{
			const d = new Date ();
			const year  = d.getFullYear ();
			let   month = d.getMonth () +1;
			let   day   = d.getDate ();
			let   hour  = d.getHours ();
			let   min   = d.getMinutes ();
			let   secs  = d.getSeconds ();

			month = month < 10 ? "0" + month : month;
			day   = day   < 10 ? "0" + day   : day;
			hour  = hour  < 10 ? "0" + hour  : hour;
			min   = min   < 10 ? "0" + min   : min;
			secs  = secs  < 10 ? "0" + secs  : secs;

			res.splice ( 0, 0, col.FgYellow + col.BgBlack + `${year}${month}${day}:${hour}${min}${secs}` );
		}

		const r = res.map ( ( e ) => {
			if ( typeof e != "object" ) return e;

			return "\n" + col.Reset + JSON.stringify ( e, null, 4 ) + _c.text;
		});

		console.log ( r.join ( " " ) + col.Reset );
	};

	error ( ...args ) 
	{
		if ( LOG_LEVEL_ERROR < this.level ) return;

		this._out ( 'error', args );
	};

	warn ( ...args )
	{
		if ( LOG_LEVEL_WARN < this.level ) return;

		this._out ( 'warn', args );
	};

	info ( ...args ) 
	{
		if ( LOG_LEVEL_INFO < this.level ) return;

		this._out ( 'info', args );
	};

	debug ( ...args ) 
	{
		if ( LOG_LEVEL_DEBUG < this.level ) return;

		this._out ( 'debug', args );
	};

	log ( ...args ) 
	{
		if ( LOG_LEVEL_INFO < this.level ) return;

		this._out ( 'info', args );
	};

	sep ()
	{
		console.log ( '==================================================' );
	}

	_stack () 
	{
		const e = new Error();
		const frame = e.stack.split( "\n" ) [ 4 ];
		const fname = frame.replace ( /.*\(([^:]*).*/, "$1" );
		const line  = frame.split ( ":" ) [ 1 ];
		const func  = frame.split ( " " ) [ 5 ];
		const comp  = `${fname}:${func}:${line}`;

		return { frame, line, func, fname, comp };
	}
};

Colorsole.DEBUG = LOG_LEVEL_DEBUG;
Colorsole.INFO  = LOG_LEVEL_INFO;
Colorsole.WARN  = LOG_LEVEL_WARN;
Colorsole.ERROR = LOG_LEVEL_ERROR;

module.exports = Colorsole;