import json
from django.test import TestCase, Client
from optimize.optimize import efficient, naive
from .compute import compute_stats
import time


class BenchmarkViewTests(TestCase):

    def setUp(self):
        self.client = Client()
        self.num_lists = 3
        self.num_elements = 5
        self.replications = 2

    def _test_benchmark_results(self, algorithm):
        result = compute_stats(algorithm, self.num_lists,
                               self.num_elements, self.replications, time.time())

        for key, value in result.items():
            if key == "algorithm":
                self.assertIsInstance(value, str)

            elif key == "num_lists" or key == "num_elements" or key == "replications" or key == "complexity":
                self.assertIsInstance(value, int)

            else:
                self.assertIsInstance(value, float)

    def test_benchmark_efficient(self):
        self._test_benchmark_results(efficient)

    def test_benchmark_naive(self):
        self._test_benchmark_results(naive)
