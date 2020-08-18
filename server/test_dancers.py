import json

import pytest
import time
from server import cbs

from server.dancers import dummy_algo, Dance, Vector

with open("test_data.json", encoding="latin-1") as f:
    test_json = json.load(f)

start = [Vector(13, 13), Vector(17, 13), Vector(21, 13)]
intermediate_1 = [Vector(14, 13), Vector(18, 13), Vector(22, 13)]
intermediate_2 = [Vector(13, 12), Vector(17, 18), Vector(21, 12)]
target = [Vector(13, 11), Vector(17, 17), Vector(21, 11)]


def test_dummy_algo():
    path = [start, intermediate_1, intermediate_2, target]
    result = dummy_algo(start, target, 0, 0)
    assert result == path


def test_dance_vectors():
    dance = Dance(test_json)
    assert dance.id == test_json["id"]
    assert dance.title == test_json["title"]
    assert dance.dimensions == test_json["dimensions"]

    dance.interpolate(dummy_algo)
    # TODO: fix tests

def test_pathfinding():
    print(cbs.find_dance_path([{'name': 'A', 'start': [10, 20], 'goal': [20, 10]},
                               {'name': 'B', 'start': [20, 10], 'goal': [10, 20]}], 33, 25))
