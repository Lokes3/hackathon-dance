from astar import AStar
import numpy as np
from itertools import product


DIST_THRESHOLD = 2
DIST = 2

def stencil(dim,dist):
    dist_list =[]
    for i in reversed(range(dist)):
        dist_list.append(-1* (i+1))
    dist_list.append(0)
    for i in range(dist):
        dist_list.append(i+1)
    stencils = list(product(dist_list, repeat=dim))
    zero = ((0,) * dim)
    stencils.remove(zero)
    return stencils

class DanceAStar(AStar):

    def __dancer_distance(self, node, dancer1, dancer2):
        ## Euclidian distance
        return np.sqrt((node[2*dancer1]-node[2*dancer2])**2+(np.sqrt(node[2*dancer1+1]-node[2*dancer2+1])))

    def neighbors(self, node):
        n_dancers = len(node)//2
        node_array = np.array(node)
        diffs = 2 * stencil(len(node), DIST)        # Find all neighbors
        neighbor_list = []
        for diff in diffs:
            potential_neighbor = node_array + diff
            potential = True
            for dancer1 in range(n_dancers):
                for dancer2 in range(n_dancers):
                    ## Check collision
                    if dancer2 > dancer1 and \
                            self.__dancer_distance(potential_neighbor, dancer1, dancer2) < DIST_THRESHOLD:
                        potential = False
                        break
            if potential:
                ## No collisions
                neighbor_list.append(potential_neighbor.tolist())

    def distance_between(self, n1, n2):
        diff_vector = np.abs(np.array(n1) - np.array(n2))
        return np.sum(diff_vector)

    def heuristic_cost_estimate(self, current, goal):
        return self.distance_between(current, goal)

    def is_goal_reached(self, current, goal):
        return self.distance_between(current, goal) < 1e-6


def find_dance_path(start, goal):
    return list(DanceAStar().astar(start, goal))

if __name__ == '__main__':
