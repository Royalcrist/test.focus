import { BASEURL } from '@/config/constants';
import { BenchmarkData, BenchmarkRequest } from '@/types';
import axios from 'axios';
import _ from 'lodash';

const objectToCamelCase = (obj: any) => {
	return _.mapKeys(obj, (value, key) => _.camelCase(key));
};

const objectToSnakeCase = (obj: any) => {
	return _.mapKeys(obj, (value, key) => _.snakeCase(key));
};

export const benchmark = async (
	input: BenchmarkRequest,
): Promise<BenchmarkData> => {
	const { data } = await axios.post(
		`${BASEURL}/benchmark/`,
		objectToSnakeCase(input),
	);
	return objectToCamelCase(data) as BenchmarkData;
};
