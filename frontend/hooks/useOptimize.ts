import { optimizeEfficient, optimizeNaive } from '@/services/optimizeService';
import { OptimizeData, OptimizeFormData } from '@/types';
import { useState } from 'react';

const useOptimize = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState<OptimizeData | null>(null);
	const [error, setError] = useState<string | null>(null);

	const fetchData = async (input: OptimizeFormData) => {
		if (!input) return;
		setIsLoading(true);
		try {
			const response =
				input.algorithm == 'naive'
					? await optimizeNaive(input)
					: await optimizeEfficient(input);
			setData(response);
		} catch (error: any) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, data, error, fetchData };
};

export default useOptimize;
