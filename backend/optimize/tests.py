from django.test import TestCase
from .optimize import efficient, naive


class OptimizeViewTests(TestCase):

    def setUp(self):
        self.lists = [
            [5, 4], [7, 8, 9], [5, 7, 8, 9, 10]
        ]
        self.m = 40
        self.f = lambda x: x ** 2

    def _test_optimize(self, algorithm):
        result = algorithm(self.lists, self.m, self.f)

        self.assertEqual(result, 37)

    def test_optimize_efficient(self):
        self._test_optimize(efficient)

    def test_optimize_naive(self):
        self._test_optimize(naive)
