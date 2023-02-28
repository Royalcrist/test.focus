export type Algorithm = 'naive' | 'efficient';

export interface BenchmarkRequest {
	numLists: number;
	numElements: number;
	replications: number;
}

export interface BenchmarkData {
	algorithm: Algorithm;
	numLists: number;
	numElements: number;
	replication: number;
	avgTime: number;
	minTime: number;
	maxTime: number;
	stdDevTime: number;
	avgCpuUsage: number;
	maxCpuUsage: number;
	complexity: number;
}

export interface OptimizeRequest {
	lists: number[][];
	m: number;
	f: string;
}

export interface OptimizeFormData extends OptimizeRequest {
	algorithm: 'naive' | 'efficient';
}

export interface OptimizeData {
	result: number;
	time: number;
}
