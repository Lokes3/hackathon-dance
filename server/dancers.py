#! /usr/bin/env python3.8


import json
from typing import Any, Callable, Dict, Generator, Tuple, List

with open("test_data.json") as f:
    test_data = json.load(f)


class Dance:
    def __init__(self, json_object: Dict[str, Any]) -> None:
        self.json = json_object
        self.title: str = json_object.get("title", None)
        self.id: int = json_object.get("id", None)
        self.choreography: List[Dict[str, Any]] = json_object.get("choreography", [])

    def _vectors(self) -> Generator:
        for frame in self.choreography:
            vector = []
            for pos in sorted(frame["positions"], key=lambda pos: pos["name"]):
                vector.extend([pos["x"], pos["y"]])
            yield tuple(vector)

    def vector_pairs(self) -> Generator:
        prev = None
        for vec in self._vectors():
            if prev is not None:
                yield prev, vec
            prev = vec


if __name__ == "__main__":
    dance = Dance(test_data)
    for x in dance.vector_pairs():
        print(x)
