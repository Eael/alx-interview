#!/usr/bin/python3
'''A module for working with Pascal's triangle.
'''


def pascal_triangle(n):
    '''Creates a list of lists of integers representing
    the Pascal's triangle of a given integer.
    '''
    triangle = []
    try:
        assert n > 0
        for i in range(n):
            line = []
            for j in range(i + 1):
                if j == 0 or j == i:
                    line.append(1)
                elif i > 0 and j > 0:
                    line.append(triangle[i - 1][j - 1] + triangle[i - 1][j])
            triangle.append(line)
        return triangle

    except (TypeError):
        print("Please use a number")
        return triangle
    except (AssertionError):
        print("No negative number allowed")
        return triangle
