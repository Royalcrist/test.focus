import itertools


def naive(lists, m, f):
    """
    :param lists: List of lists with values to choose from.
    :param m: Quotient of modulo operator.
    :param f: Function to map x to f.
    :return: Maximum
    """
    max_val = 0

    for elements in itertools.product(*lists):
        val = sum([f(x) for x in elements]) % m
        if val > max_val:
            max_val = val
    return max_val


def efficient(lists, m, f):
    """
    :param lists: List of lists with values to choose from.
    :param m: Quotient of modulo operator.
    :param f: Function to map x to f.
    :return: Maximum
    """
    max_val = 0
    for i in range(len(lists)):
        lists[i] = sorted([f(x) % m for x in lists[i]], reverse=True)
    for elements in itertools.product(*lists):
        val = sum(elements) % m
        if val > max_val:
            max_val = val
    return max_val
