#!/usr/bin/python3
"""
Finds the minimum operation for a function
"""


def minOperations(n):
    """
    Calculates the fewest number of operations needed to result in exactly
    n H characters
    """
    if not isinstance(n, int):
        return 0
    ops = 0
    copied = 0
    done = 1

    while done < n:
        if copied == 0:
            # Starting the first copy and paste
            copied = done
            done += copied
            ops += 2
           # print('-(11)->{}'.format('H' * done), end='')
        elif n - done > 0 and (n - done) % done == 0:
            copied = done
            done += copied
            ops += 2
           # print('-(11)->{}'.format('H' * done), end='')
        elif copied > 0:
            done += copied
            ops += 1
           # print('-(11)->{}'.format('H' * done), end='')
    #print ('')
    return ops

