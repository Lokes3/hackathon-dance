from peewee import CharField, Model, SqliteDatabase, TextField

db = SqliteDatabase("dances.db")


class DanceDB(Model):
    title = CharField()
    data = TextField()

    class Meta:
        database = db


MODELS = [DanceDB]


db.connect()
db.create_tables(MODELS)


def get_dances(title):
    # ** betyder ILIKE
    query = DanceDB.select().where(DanceDB.title ** f"{title}%")
    return list(query)


def save_dance(dance):
    db_dance = DanceDB(title=dance.title, data=dance.to_json())
    db_dance.save()
    return db_dance.id
