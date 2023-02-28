import json
from django.test import TestCase, Client
import logging

logger = logging.getLogger('my_logger')


class OptimizeViewTests(TestCase):

    def setUp(self):
        self.client = Client()
        self.lists = [
            [5, 4], [7, 8, 9], [5, 7, 8, 9, 10]
        ]
        self.m = 40
        self.f = "lambda x: x ** 2"

    def _test_optimize(self, url):
        response = self.client.post(
            "/optimize" + url,
            {
                "lists": [",".join(str(x) for x in lst) for lst in self.lists],
                "m": self.m,
                "f": self.f
            }
        )
        logger.debug("Response " + url + " " +
                     response.content.decode("utf-8"))

        response_data = json.loads(response.content)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response_data["result"], 37)
        self.assertIsInstance(response_data["time"], float)

    def test_optimize_efficient(self):
        self._test_optimize("/optimize_efficient/")

    def test_optimize_naive(self):
        self._test_optimize("/optimize_naive/")
