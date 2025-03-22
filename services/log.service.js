import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
	console.error(chalk.bgRed(' ERROR ') + ' ' + error);
};
const printSuccess = (message) => {
	console.error(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

const printHelp = () => {
	console.log(
		dedent`${chalk.bgCyan(' HELP ')}
		Без параметров - вывод погоды
		-s [CITY] для установки города
		-h для вывода помощи
		-t [API_KEY] для сохранения токена
		`
	);
};

export { printError, printSuccess, printHelp };
