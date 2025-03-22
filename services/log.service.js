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

const printWeather = ({ name, weather, main, wind }) => {
	console.log(
		dedent`${chalk.bgYellow('Weather')} Погода в городе ${name}
			${weather[0].description}
			Температура: ${main.temp} (ощущается как ${main.feels_like})
			Влажность: ${main.humidity}%
			Скорость ветра: ${wind.speed}`
	);
};

export { printError, printSuccess, printHelp, printWeather };
