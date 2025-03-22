#!/usr/bin/env node
import dedent from 'dedent-js';
import { getArgs } from './helpers/args.js';
import { getWeather } from './services/api.service.js';
import {
	printHelp,
	printSuccess,
	printError,
	printWeather
} from './services/log.service.js';
import {
	saveKeyValue,
	TOKEN_DICTIONARY,
	getKeyValue
} from './services/storage.service.js';
import axios from 'axios';

const saveToken = async (token) => {
	if (!token.length) {
		printError('Передай токен, живо!');
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess('Токен сохранен');
	} catch (e) {
		printError(e.message);
	}
};

const saveCity = async (city) => {
	if (!city.length) {
		printError('Передай город, живо!');
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.city, city);
		printSuccess('Город сохранен');
	} catch (e) {
		printError(e.message);
	}
};

const getForecast = async () => {
	try {
		const city = process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city));
		const res = await getWeather(city);
		printWeather(res);
	} catch (e) {
		if (e?.response?.status == 404) {
			printError('Неверно указан город');
		} else if (e?.response?.status == 401) {
			printError('Неверно указан токен');
		} else {
			printError(e.message);
		}
	}
};

const initCLI = () => {
	const args = getArgs(process.argv);
	if (args.h) {
		return printHelp();
	}
	if (args.s) {
		return saveCity(args.s);
	}
	if (args.t) {
		return saveToken(args.t);
	}
	return getForecast();
};

initCLI();
