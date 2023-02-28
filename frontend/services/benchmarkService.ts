import { BASEURL } from '@/config/constants';
import { BenchmarkData, BenchmarkRequest } from '@/types';
import axios from 'axios';
import _ from 'lodash';

// keys are snake_case, values are camelCase. It will recursively convert every key and children's keys
const objectToCamelCase = (obj: any, recursive = true) => {
	return _.transform(obj, (result: any, value: any, key: string) => {
		if (recursive && _.isObject(value)) {
			value = objectToCamelCase(value);
		}
		result[_.camelCase(key)] = value;
	});
};

const objectToSnakeCase = (obj: any, recursive = true) => {
	return _.transform(obj, (result: any, value: any, key: string) => {
		if (recursive && _.isObject(value)) {
			value = objectToSnakeCase(value);
		}
		result[_.snakeCase(key)] = value;
	});
};

export const benchmark = async (
	input: BenchmarkRequest,
): Promise<BenchmarkData> => {
	const { data } = await axios.post(
		`${BASEURL}/benchmark/`,
		objectToSnakeCase(input),
	);
	console.log(objectToCamelCase(data), data);
	return objectToCamelCase(data) as BenchmarkData;
};
