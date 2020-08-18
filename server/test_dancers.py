import json

import pytest
<<<<<<< HEAD
=======
import time
from server import dance_cbs
>>>>>>> Next-level pathfinding

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
<<<<<<< HEAD
    dance = Dance(test_json)
    assert dance.id == test_json["id"]
    assert dance.title == test_json["title"]
    assert dance.dimensions == test_json["dimensions"]

    assert list(dance._vectors()) == [start, target]
    assert list(dance.vector_pairs()) == [(start, target)]

    dance.interpolate(dummy_algo)
    # TODO: fix tests

