const chalk = require("chalk");
const moment = require("moment");

module.exports = class Logger {
	static log (content, type = "log") {
		const date = `${moment().format("DD-MM-YYYY hh:mm:ss")}`;
		switch (type) {
	
		case "log": {
			return console.log(`MADE BY DORNOX06 | [${chalk.black.bgBlue(type.toUpperCase())}] ${content}`);
		}
		case "warn": {
			return console.log(`MADE BY DORNOX06 | [${chalk.black.bgYellow(type.toUpperCase())}] ${content}`);
		}
		case "error": {
			return console.log(`MADE BY DORNOX06 | [${chalk.black.bgRed(type.toUpperCase())}] ${content}`);
		}
		case "debug": {
			return console.log(`MADE BY DORNOX06 | [${chalk.black.bgGreen(type.toUpperCase())}] ${content}`);
		}
		case "cmd": {
			return console.log(`MADE BY DORNOX06 | [${chalk.black.bgWhite(type.toUpperCase())}] ${content}`);
		}
		case "event": {
			return console.log(`MADE BY DORNOX06 | [${chalk.black.bgWhite(type.toUpperCase())}] ${content}`);
		}
		case "ready": {
			return console.log(`MADE BY DORNOX06 | [${chalk.black.bgBlueBright(type.toUpperCase())}] ${content}`);
		} 
		default: throw new TypeError("Logger type must be either warn, debug, log, ready, cmd or error.");
		}
	}
};