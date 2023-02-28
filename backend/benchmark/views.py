import random
import time
import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from optimize.optimize import efficient, naive
from .compute import compute_stats


@csrf_exempt
@require_http_methods(["POST"])
def benchmark_efficient(request):
    response = _benchmark(request, efficient)
    return JsonResponse(response)


@csrf_exempt
@require_http_methods(["POST"])
def benchmark_naive(request):
    response = _benchmark(request, naive)
    return JsonResponse(response)


@csrf_exempt
@require_http_methods(["POST"])
def benchmark(request):
    response_naive = _benchmark(request, naive)
    response_efficient = _benchmark(request, efficient)
    return JsonResponse({
        "naive": response_naive,
        "efficient": response_efficient
    })


def _benchmark(request, optimizer):
    data = request.body
    data = json.loads(data)
    num_lists = int(data["num_lists"])
    num_elements = int(data["num_elements"])
    replications = int(data["replications"])

    # Set random seed for reproducibility
    random_seed = int(data.get("random_seed", time.time()))
    random.seed(random_seed)

    return compute_stats(optimizer, num_lists, num_elements, replications, random_seed)
