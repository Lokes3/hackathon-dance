#! /usr/bin/env python3.8

import json
from typing import Any, Callable, Dict, Generator, NamedTuple, Tuple, List

from server import cbs

with open("test_data.json", encoding="utf-8") as f:
    test_data = json.load(f)

Algorithm = Callable[[List[Dict[str, Any]]], Dict[str, List[Tuple[int, int]]]]


class Dance:
    def __init__(self, json_object: Dict[str, Any]) -> None:
        self.title: str = json_object["title"]
        self.dimensions: List[int] = json_object["dimensions"]
        self.real_dimensions = [2 * self.dimensions[d] + 1 for d in ["columns", "rows"]]
        self.id: int = json_object["id"]
        self.choreography: List[Dict[str, Any]] = json_object["choreography"]
        for frame in self.choreography:
            frame["positions"].sort(key=lambda pos: pos["name"])

    def movements(self) -> Generator[List[Dict[str, Any]], None, None]:
        for start_frame, target_frame in zip(self.choreography[:-1], self.choreography[1:]):
            yield [
                dict(
                    name=start_pos["name"],
                    start=[start_pos["x"], start_pos["y"]],
                    goal=[target_pos["x"], target_pos["y"]],
                )
                for start_pos, target_pos in zip(
                    start_frame["positions"], target_frame["positions"]
                )
            ]

    def interpolate(self, algorithm: Algorithm) -> None:
        for frame, movement_dict in zip(self.choreography, self.movements()):
            result = algorithm(movement_dict, *self.real_dimensions)
            num_steps = len(list(result.values())[0]) - 2

            frame["key_frames"] = [dict(index=i, positions=[]) for i in range(num_steps)]
            for (name, pos_list), pos in zip(sorted(result.items()), frame["positions"]):
                assert name == pos["name"]
                for i, (x, y) in enumerate(pos_list[1:-1]):
                    frame["key_frames"][i]["positions"].append(dict(pos, x=x, y=y))

    def to_dict(self) -> Dict[str, Any]:
        return dict(
            title=self.title,
            dimensions=self.dimensions,
            choreography=self.choreography,
            id=self.id,
        )


def dummy_algo(
    agents: List[Dict[str, Any]], x_min: int, y_min: int
) -> Dict[str, List[Tuple[int, int]]]:
    out_dict = {}
    for agent in agents:
        start_x, start_y = agent["start"]
        target_x, target_y = agent["goal"]
        out_dict[agent["name"]] = [
            (start_x, start_y),
            (start_x + 1, start_y),
            (target_x, target_y + 1),
            (target_x, target_y),
        ]
    return out_dict


if __name__ == "__main__":
    dance = Dance(test_data)
    from pprint import pprint

    pprint(list(dance.movements()))

    # res = dummy_algo(
    #     [
    #         {"goal": [13, 11], "name": "A", "start": [13, 13]},
    #         {"goal": [17, 17], "name": "B", "start": [17, 13]},
    #         {"goal": [21, 11], "name": "C", "start": [21, 13]},
    #     ],
    #     10,
    #     10,
    # )
    # print(res)

    dance.interpolate(cbs.find_dance_path)
    # with open("test_data_dummy_algo.json", "w", encoding="utf-8") as f:
    #     f.write(json.dumps(dance.to_dict(), indent=4, ensure_ascii=False))
    print(json.dumps(dance.to_dict(), indent=4, ensure_ascii=False))
