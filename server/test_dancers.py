import json

import pytest
from server import dance_astar

from server import dancers

TEST_JSON = json.loads(
    """
{
  "title": "Min första lista",
  "dimensions": {
    "rows": 12,
    "columns": 16
  },
  "choreography": [
    {
      "index": 0,
      "subindex": 0,
      "description": "raise your hands",
      "positions": [
        {
          "name": "A",
          "x": 13,
          "y": 13,
          "color": "red"
        },
        {
          "name": "B",
          "x": 17,
          "y": 13,
          "color": "green"
        },
        {
          "name": "C",
          "x": 21,
          "y": 13,
          "color": "blue"
        }
      ]
    },
    {
      "index": 1,
      "subindex": 0,
      "description": "raise your hands",
      "positions": [
        {
          "name": "A",
          "x": 13,
          "y": 11,
          "color": "red"
        },
        {
          "name": "B",
          "x": 17,
          "y": 17,
          "color": "green"
        },
        {
          "name": "C",
          "x": 21,
          "y": 11,
          "color": "blue"
        }
      ]
    }
  ],
  "id": 1
}
"""
)


def test_dance_vectors():
    dance = dancers.Dance(TEST_JSON)
    assert list(dance._vectors()) == [(13, 13, 17, 13, 21, 13), (13, 11, 17, 17, 21, 11)]
    assert list(dance.vector_pairs()) == [((13, 13, 17, 13, 21, 13), (13, 11, 17, 17, 21, 11))]

def test_simple_pathfinding():
    dance_astar.find_dance_path(start=((0,0),(2,0)),goal=((0,2),(2,2)), xmax=5, ymax=5)
