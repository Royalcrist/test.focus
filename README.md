## Assignment: Benchmarking Optimization Algorithms

_In this assignment you will first write an optimization algorithm to optimize a given function. To benchmark the performance of your implementation, you will also write a naive approach to solving the optimization problem. In addition, you will write code to benchmark both algorithms in terms of computation time. You will create an API with endpoints implementing these functionalities. It will be deployed in a Docker container, which must include (unit) tests that test if your code is doing what it should do. Finally, you will implement an endpoint that will supply all the necessary information to plot the benchmark statistics of both algorithms against eachother._

You can use all available resources for this assignment. If necessary, you can use (python) libraries. All the assignments have numerous solutions. You are free to choose libraries/frameworks that you think fits the assignments best. If you have a question regarding one of the assignments, don't hesitate to ask. I am available via email or phone.

Good luck!

### Part I: Optimization Algorithms

Assume a function $f(x)=x^2$. Assume a set of $K$ lists, $X_{1},X_{2},...X_{K}$, where each list $X_{i}$ has $N_{i}$ elements. So, the lists do not necessarily have the same lengths. The function that needs to be maximized is $R = (\sum_{k}f(x_{k}))\mod M$, where each $x_{i}$ is one element picked from list $X_{i}$. For this assignment you can assume that all the elements from the lists are larger or equal to $1$ or smaller or equal to $10^9$. That is, $1 <= x_{i,k} <= 10^9$.

To give an example, assume that we have a 3 lists: `([5, 4], [7, 8, 9], [5, 7, 8, 9, 10])`, and that $M=40$. Then the maximum value of $R$ is 37, and is achieved by choosing 4 from the first list, 9 from the second and 10 from the third list: $37=(4^2+9^2+10^2)\mod 40$. Note that because of the properties of the modulo operator, this problem cannot be solved by just taking the largest element of each list.

1. Implement a naive approach to solving this optimization problem. The naive approach to solving this problem would be to check the possible combinations to find the maximum value. It is not necessary to return the solution (combinations of elements that yields the maximum value). Use the following template, and describe briefly (in a few sentences) how it works:

```python
def naive(lists, m, f):
    """
    :param lists: List of lists with values to choose from.
    :param m: Quotient of modulo operator.
    :param f: Function to map x to f.
    :return: Maximum
    """
    pass
```

2. Implement a more efficient way to solve the optimization problem. Note that there are multiple ways to improve the naive approach gaining substantial improvements, in terms of computational efficiency, especially for a higher $`K`$. It is advisable to have a detailed look at the properties of the modulo operator. Use the following template, and describe briefly (in a few sentences) how it works and why it works:

```python
def efficient(lists, m, f):
    """
    :param lists: List of lists with values to choose from.
    :param m: Quotient of modulo operator.
    :param f: Function to map x to f.
    :return: Maximum
    """
    pass
```

3. Implement a function or class which is able to use both implementations of the optimization algorithms, and return relevant benchmark statistics based on simulation. The simulation should repeat the same procedure `replication` times. In each iteration a random `lists` will be drawn, based on the parameters `num_lists` (=$`K`$) and `num_elements` such that `len(lists)=num_lists` and `len(lists[0])=num_elements`. In other words, the functionality should at least take the arguments: `num_lists`, `num_elements`, `replications`. The functionality should at least return a mean measurement of time over the replications.

### Part II: Application

In this part you will write a web API, implementing the functionalities developed in Part I.

1. Create a web API which has the following endpoints:
   - On the route `/optimize/efficient`, implement the function `efficient()`,
   - On the route `/optimize/naive`, implement the function `naive()`,
   - On the route `/benchmark/efficient`, implement the functionality to benchmark the `efficient` algorithm, and return the necessary statistics,
   - On the route `/benchmark/naive`, implement the functionality to benchmark the `naive` algorithm, and return the necessary statistics
2. Set up and write the necessary things to build a docker container with your created application running inside. Make sure that it can be reached from outside the container using HTTP requests. Also make sure that all the dependencies are installed properly.
3. Create some test script(s) to automate testing your codes before building and deploying your application inside the docker container. Make sure that you also include tests to verify that your created algorithms give the correct answers.
4. Create an endpoint which would be able to serve the front-end with the necessary information to plot the differences in performance between the two algorithms as a function of `num_lists`. In other words, make sure that a user on the front-end would be able to compare the performance of `efficient` and `naive` as $`K`$ increases.

### Part III: Frontend

In this part you will write the frontend which communicates with the backend implemented in Part II. You can use any React library component for this exercise.

1. Create a small interface for users to evaluate the endpoints `/optimize/efficient` and `/optimize/naive`.
2. Create an interface to visualize the difference in performance between the `efficient` and `naive`. I.e. create an interface for the endpoint implemented in Part II exercise 4.

## Solution

I have implemented the solution in Python. The code can be found in the `src` folder. The code is structured as follows:

- `backend`: Contains the code for the backend.
  - `optimize`: Contains the code for the optimization algorithms.
    - `optimize.py`: Contains the code for the optimization algorithms.
    - `test.py`: Contains the unit tests for the optimization algorithms.
  - `benchmark`: Contains the code for the benchmarking functionality.
    - `computations.py`: Contains the code for the benchmarking functionality.
    - `test.py`: Contains the unit tests for the benchmarking functionality.
- `frontend`: Contains the code for the frontend.
  - `components`: Contains the React components.
  - `config`: Contains the configuration for the frontend.
  - `hooks`: Contains the custom hooks.
  - `pages`: Contains the pages.
  - `public`: Contains the static files.
  - `services`: Contains the services to communicate with the backend.
  - `types.ts`: Contains the types shared across all the app.
- `docker-compose.yml`: Contains the configuration for the docker-compose file.

### run the app

To run the app, you need to have docker and docker-compose installed. Then you can run the following command:

```bash
docker-compose up -d
```

This will build the docker images and run the containers. The app will be available at `http://localhost:3000`.

### efficient improvements

This solution first sorts each list in decreasing order of $f(x)$ modulo $m$, and stores the maximum value in a separate list max_values. This ensures that we can directly pick the maximum value from each list when forming combinations, instead of iterating through all the elements of each list.

Then, it iterates through all possible combinations of elements from the input lists and calculates their sum modulo $m$. It updates max_val if a new maximum value is found.

Since the input lists are sorted, and the maximum value of each list is stored separately, the time complexity of this solution is reduced to $O(KN \log N)$, where $N$ is the maximum length of any list. The space complexity is $O(KN)$.

Note that the solution assumes that $f(x)$ is a non-negative function. If this is not the case, we would need to modify the sorting step to handle negative values correctly.

### Benchmark modifications

The benchmarking functionality is implemented in `backend/benchmark/`. It takes the following arguments:

- `num_lists`: The number of lists to generate.
- `num_elements`: The number of elements in each list.
- `replications`: The number of times to repeat the benchmarking.

The benchmarking functionality generates `num_lists` lists of length `num_elements` each, and then runs the naive and efficient algorithms `replications` times. It returns the mean time taken by each algorithm over the `replications` runs.

This solution was intended to use two petitions to the backend, one for each algorithm. However, I was unable to get the frontend to make two simultaneous requests to the backend. Therefore, I modified the benchmarking functionality to run both algorithms in the same function, and return the results in a single JSON object.

To ensure that the second algorithm does not benefit from the previous run, the the views.py file was modified to include a random seed that is passed to the algorithm functions. This will ensure that each run is independent and not influenced by previous runs.

### Frontend

The frontend is implemented in `frontend/`. It is a NextJS app. It uses `axios` for making HTTP requests to the backend.

The frontend has just one page, which contains two forms:

- The first form allows the user to input the parameters for the optimization algorithms.
- The second form allows the user to input the parameters for the benchmarking functionality.
