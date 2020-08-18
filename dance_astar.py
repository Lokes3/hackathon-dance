from astar import AStar
import numpy as np
from itertools import product


DIST_THRESHOLD = 1
DIST = 1

def stencil(dim):
    ## Creates stencil of four directions of movement + standstill
    stencils = list(product([-2, -1, 0, 1, 2], repeat=dim))
    zero = ((0,) * dim)
    stencils.remove(zero)
    return stencils

def taxi_cab_stencil(stencil):
    ## Translates stencil into taxi cab movement
    stencil_dict = {-2: (-1,0), -1 : (0, -1), 0: (0,0), 1: (0, 1), 2: (1, 0)}
    out_stencil = []
    for diff in stencil:
        out_stencil.append(list(map(lambda n: stencil_dict[n], diff)))
    return out_stencil


class DanceAStar(AStar):
    def __init__(self, xmax, ymax):
        self.xmax = xmax
        self.ymax = ymax

        super(DanceAStar, self).__init__()

    #def __dancer_distance(self, node, dancer1, dancer2):
     #   ## Euclidian distance
      #  return np.sqrt((node[dancer1, 0]-node[dancer2,0])**2+(np.sqrt(node[dancer1,1]-node[dancer2,1])))

    def neighbors(self, node) -> list:
        n_dancers = len(node)
        from icecream import ic
        node_array = np.array(node)
        diffs = taxi_cab_stencil(stencil(n_dancers))        # Find all neighbors
        ic(diffs)
        #print(diffs)
        neighbor_list = []
        for diff in diffs:
            potential_neighbor = node_array + diff
            potential = True
            for dancer1 in range(n_dancers):
                if potential_neighbor[dancer1, 0] < 0 or potential_neighbor[dancer1, 0] > self.xmax \
                    or potential_neighbor[dancer1, 1] < 0 or potential_neighbor[dancer1, 1] > self.ymax:
                    potential = False
                    break
                for dancer2 in range(dancer1 + 1, n_dancers):
                    ## Check collision
                    if (potential_neighbor[dancer1] == potential_neighbor[dancer2]).all():
                        potential = False
                        break

            if potential:
                ## No collisions
                #print(potential_neighbor)
                neighbor_list.append(tuple(potential_neighbor[0]))
        print(neighbor_list)
        return neighbor_list

    def distance_between(self, n1, n2):
        #print(np.array(n1))
        diff_vector = np.abs(np.array(n1) - np.array(n2))
        return np.sum(diff_vector)

    def heuristic_cost_estimate(self, current, goal):
        print(self.distance_between(current, goal))
        return self.distance_between(current, goal)

    def is_goal_reached(self, current, goal):
        return self.distance_between(current, goal) < 1e-6


def find_dance_path(start, goal, xmax, ymax):
    return list(DanceAStar(xmax, ymax).astar(start, goal))

if __name__ == '__main__':
    print(find_dance_path(start=((0, 0), (2, 0)), goal=((0, 3), (2, 3)), xmax=5, ymax=5))