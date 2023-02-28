import time
import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from .optimize import efficient, naive


@csrf_exempt
@require_http_methods(["POST"])
def optimize_efficient(request):
    response = _optimize(request, efficient)
    return JsonResponse(response)


@csrf_exempt
@require_http_methods(["POST"])
def optimize_naive(request):
    response = _optimize(request, naive)
    return JsonResponse(response)


def _optimize(request, optimizer):
    data = request.body
    data = json.loads(data)
    lists = data["lists"]
    m = int(data["m"])
    f_str = data['f']
    f = eval(f_str)

    start_time = time.time()
    result = optimizer(lists, m, f)
    end_time = time.time()

    response = {
        "result": result,
        "time": end_time - start_time
    }

    return response
