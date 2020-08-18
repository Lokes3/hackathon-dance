from cbs_mapf.planner import Planner


def find_dance_path(start, goal, xmax, ymax):
    planner = Planner(1, 1, [(0,0), (30, 30)])
    path = planner.plan(start, goal)
    return path

path = find_dance_path([(10,10), (20,10)], [(20,20), (10,20)], None, None)
print(path)
