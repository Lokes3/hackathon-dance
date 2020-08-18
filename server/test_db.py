from peewee import SqliteDatabase

from .db import MODELS, get_dances, save_dance
from .web import Dance

test_db = SqliteDatabase(":memory:")


def setup_module(self):
    # Bind model classes to test db. Since we have a complete list of
    # all models, we do not need to recursively bind dependencies.
    test_db.bind(MODELS, bind_refs=False, bind_backrefs=False)
    test_db.connect()
    test_db.create_tables(MODELS)


def teardown_module(self):
    # Not strictly necessary since SQLite in-memory databases only live
    # for the duration of the connection, and in the next step we close
    # the connection...but a good practice all the same.
    test_db.drop_tables(MODELS)
    # Close connection to db.
    test_db.close()


def test_get_dances():
    dance_1 = Dance(title="Example 1", dimensions={}, choreography=[])
    dance_2 = Dance(title="Example 2", dimensions={}, choreography=[])
    dance_3 = Dance(title="Dont save me!", dimensions={}, choreography=[])
    r1 = save_dance(dance_1)
    r2 = save_dance(dance_2)
    r3 = save_dance(dance_3)
    dances = get_dances(title="Example")
    assert len(dances) == 2
