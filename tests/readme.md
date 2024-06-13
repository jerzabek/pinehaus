# Performance testing

This directory contains scripts used to interpret test results generated by load testing the Pinehaus web application. Testing was done by simulating a realistic user flow through the application.
Test simulated 500 simmountaneous users over a period of one minute and 45 seconds. The test was ran comparing the performance of the backend with scaling and without scaling.

Directory structure:

- ➗ `results/` - CSV files containing JMeter test results
- 📊 `figures/` - graphs generated using the python script
- 📦 `scripts/` - Scripts for generating graphs and running the test

## Generate graphs

The `graphs.py` script generates graphs from the test results. The script requires the `matplotlib` and `pandas` libraries to be installed.

An explanation of program arguments can be found by running:

```bash
python3 scripts/graphs.py -h
```

The first argument is an input file, a CSV file containing test results in the expected format. You may choose a graph to generate by specifying the `--graph` argument. The available graphs are:

- `errors` - Average number of errors per second
- `latency` - Average response time per second
- `both` - Combination of graphs showing their relationship

For example:

```bash
python3 scripts/graphs.py results/one-instance.csv --graph errors
```