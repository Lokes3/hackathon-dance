#! /usr/bin/env python3.8

import json
from typing import Any, Callable, Dict, Generator, NamedTuple, Tuple, List

from icecream import ic

with open("test_data.json", encoding="latin-1") as f:
    test_data = json.load(f)


class Vector(NamedTuple):
    x: int
    y: int

    def __add__(self, other: "Vector") -> "Vector":
        return Vector(self.x + other.x, self.y + other.y)


Algorithm = Callable[[List[Vector], List[Vector], int, int], List[List[Vector]]]


class Dance:
    def __init__(self, json_object: Dict[str, Any]) -> None:
        self.title: str = json_object["title"]
        dim = json_object["dimensions"]
        self.dimensions: List[int] = [2 * dim[d] + 1 for d in ["columns", "rows"]]
        self.id: int = json_object["id"]
        self.choreography: List[Dict[str, Any]] = json_object["choreography"]
        for frame in self.choreography:
            frame["positions"].sort(key=lambda pos: pos["name"])

    def _vectors(self) -> Generator[List[Vector], None, None]:
        for frame in self.choreography:
            yield [Vector(x=pos["x"], y=pos["y"]) for pos in frame["positions"]]

    def vector_pairs(self) -> Generator[Tuple[List[Vector], List[Vector]], None, None]:
        prev = None
        for vec in self._vectors():
            if prev is not None:
                yield prev, vec
            prev = vec

    def _interpolate(self, algorithm: Algorithm) -> List[Dict[str, Any]]:
        interpolated_choreo = []
        for frame, vector_pair in zip(self.choreography, self.vector_pairs()):
            _, *intermediates, _ = algorithm(*vector_pair, *self.dimensions)
            interpolated_choreo.append(frame)
            for i, intermediate_vector in enumerate(intermediates, 1):
                interpolated_pos = [
                    dict(pos, x=x, y=y)
                    for (x, y), pos in zip(intermediate_vector, frame["positions"])
                ]
                interpolated_choreo.append(dict(frame, positions=interpolated_pos, subindex=i))
        interpolated_choreo.append(self.choreography[-1])
        return interpolated_choreo

    def interpolate(self, algorithm: Algorithm) -> None:
        self.choreography = self._interpolate(algorithm)

    def to_dict(self) -> Dict[str, Any]:
        return dict(
            title=self.title,
            dimensions=self.dimensions,
            choreography=self.choreography,
            id=self.id,
        )


def dummy_algo(start: List[Vector], target: List[Vector], x_min: int, y_min: int) -> List[Vector]:
    return [
        start,
        [s + Vector(1, 0) for s in start],
        [t + Vector(0, 1) for t in target],
        target,
    ]


if __name__ == "__main__":
    dance = Dance(test_data)
    for x in dance.vector_pairs():
        ic(x)

    dance.interpolate(dummy_algo)
    print(json.dumps(dance.to_dict(), indent=4))
