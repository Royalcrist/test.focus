import { BASEURL } from '@/config/constants';
import { OptimizeData, OptimizeRequest } from '@/types';
import axios from 'axios';

export const optimizeNaive = async (
	input: OptimizeRequest,
): Promise<OptimizeData> => {
	const { data } = await axios.post(`${BASEURL}/optimize/naive/`, input);
	return data;
};

export const optimizeEfficient = async (
	input: OptimizeRequest,
): Promise<OptimizeData> => {
	const { data } = await axios.post(`${BASEURL}/optimize/efficient/`, input);
	return data;
};
