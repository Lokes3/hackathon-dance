import json
from pathlib import Path
from typing import Dict, List, Optional

from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from fastapi.responses import FileResponse
from pydantic import BaseModel

from server import cbs, dancers, db

app = FastAPI()
dist_dir = Path(__file__).absolute().parent.parent / "dist"


class Position(BaseModel):
    name: str
    x: int
    y: int
    color: str


class Formation(BaseModel):
    index: int
    description: str
    positions: List[Position]


class Dance(BaseModel):
    title: str
    dimensions: Optional[Dict]
    choreography: Optional[List[Formation]]
    id: Optional[int]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        if not self.choreography:
            self.choreography = []
        if not self.dimensions:
            self.dimensions = {"rows": 12, "columns": 12}

    def to_json(self):
        return json.dumps(jsonable_encoder(self))


@app.get("/")
def read_root():
    return FileResponse(str(dist_dir / "index.html"))


@app.get("/client.f69400ca.js")
def read_js():
    return FileResponse(str(dist_dir / "client.f69400ca.js"))


@app.get("/client.f69400ca.css")
def read_css():
    return FileResponse(str(dist_dir / "client.f69400ca.css"))


@app.get("/dances/")
def get_dances(title: Optional[str] = None):
    results = db.get_dances(title)
    dances = [Dance(**{**json.loads(r.data), **dict(id=r.id)}) for r in results]
    return {"dances": [json.loads(d.to_json()) for d in dances]}


@app.post("/dances/")
def create_dance(dance: Dance):
    dance = db.save_dance(dance)
    return {
        "success": True,
        "id": dance,
    }


@app.get("/dances/{dance_id}/")
def get_dance(dance_id: int):
    return Dance(**json.loads(db.get_dance(dance_id).data))


@app.get("/compute/")
def create_dance(dance: Dance):
    dance_obj = dancers.Dance(dance)
    dance_obj.interpolate(cbs.find_dance_path)
    return dance_obj.to_dict()
