import { benchmark } from '@/services/benchmarkService';
import { BenchmarkData, BenchmarkRequest } from '@/types';
import { useState } from 'react';

export const useBenchmark = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState<BenchmarkData | null>(null);
	const [error, setError] = useState<string | null>(null);

	const fetchData = async (input?: BenchmarkRequest) => {
		if (!input) return;
		setIsLoading(true);
		try {
			const response = await benchmark(input);
			setData(response);
		} catch (error: any) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, data, error, fetchData };
};
