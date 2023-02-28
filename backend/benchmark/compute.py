import time
import statistics
import psutil


def compute_stats(algorithm, num_lists, num_elements, replications, random_seed):
    """
    Computes statistics for the specified algorithm.

    :param algorithm: Function in String to compute the optimization.
    :param num_lists: Number of lists to optimize over.
    :param num_elements: Number of elements in each list.
    :param replications: Number of times to replicate the experiment.
    :param random_seed: Seed for the random number generator.
    :return: Tuple containing statistics for the specified algorithm.
    """

    times = []
    cpu_usage = []

    for i in range(replications):
        lists = [[j for j in range(num_elements)] for _ in range(num_lists)]
        m = num_elements // 2
        def f(x): return x ** 2

        # Start timer
        start_time = time.time()

        # Start memory and CPU usage tracking
        process = psutil.Process()
        cpu_usage.append(process.cpu_percent())

        # Compute optimization
        algorithm(lists, m, f)

        # End timer and usage tracking
        times.append(time.time() - start_time)
        cpu_usage[-1] = process.cpu_percent() - cpu_usage[-1]

    avg_time = sum(times) / replications
    min_time = min(times)
    max_time = max(times)
    std_dev_time = statistics.stdev(times)

    avg_cpu_usage = sum(cpu_usage) / replications
    max_cpu_usage = max(cpu_usage)

    # Calculate complexity
    complexity = num_lists * (num_elements ** num_lists)

    stats = {
        "algorithm": algorithm.__name__,
        "num_lists": num_lists,
        "num_elements": num_elements,
        "replications": replications,
        "avg_time": avg_time,
        "min_time": min_time,
        "max_time": max_time,
        "std_dev_time": std_dev_time,
        "avg_cpu_usage": avg_cpu_usage,
        "max_cpu_usage": max_cpu_usage,
        "complexity": complexity
    }

    return stats
