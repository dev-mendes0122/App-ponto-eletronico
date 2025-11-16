from flask_restful import Resource, reqparse
from app.models import Sensor
from app import db
from datetime import datetime, date, timedelta


# POSSÍVEIS MOVIMENTOS DO DIA
MOVIMENTOS = [
    "entrada",
    "saida_almoco",
    "volta_almoco",
    "saida_final"
]


def proximo_movimento(usuario):
    """Retorna qual deve ser o próximo movimento correto do usuário."""
    registros = Sensor.query.filter(
        Sensor.usuario == usuario,
        db.func.date(Sensor.data) == date.today()
    ).order_by(Sensor.data.asc()).all()

    return MOVIMENTOS[len(registros)] if len(registros) < 4 else None


def calcular_horas(usuario):
    """Calcula horas trabalhadas com base nos 4 registros."""
    registros = Sensor.query.filter(
        Sensor.usuario == usuario,
        db.func.date(Sensor.data) == date.today()
    ).order_by(Sensor.data.asc()).all()

    if len(registros) < 4:
        return None

    entrada = registros[0].data
    saida_almoco = registros[1].data
    volta_almoco = registros[2].data
    saida_final = registros[3].data

    manha = saida_almoco - entrada
    tarde = saida_final - volta_almoco

    return manha + tarde


class Sensor_modelo(Resource):
    argumentos = reqparse.RequestParser()
    argumentos.add_argument('usuario', required=True)
    argumentos.add_argument('dados')

    def get(self):
        return {'Sensor': [s.json() for s in Sensor.query.all()]}

    def post(self):
        dados = Sensor_modelo.argumentos.parse_args()
        usuario = dados["usuario"]

        mov = proximo_movimento(usuario)
        if not mov:
            return {"erro": "Usuário já registrou os 4 movimentos do dia"}, 400

        novo = Sensor(
            usuario=usuario,
            movimento=mov,
            dados=dados.get("dados", "registro automático")
        )

        db.session.add(novo)
        db.session.commit()

        # Se foi o último movimento → calcula horas
        if mov == "saida_final":
            total = calcular_horas(usuario)
            if total:
                novo.horas_trabalhadas = total
                db.session.commit()

        return novo.json(), 201


class Sensors_modelo(Resource):
    argumentos = reqparse.RequestParser()
    argumentos.add_argument('usuario')
    argumentos.add_argument('movimento')
    argumentos.add_argument('dados')

    def get(self, id):
        sensor = Sensor.query.filter_by(id=id).first()
        if sensor:
            return sensor.json()
        return {'message': 'Sensor inexistente'}, 404

    def delete(self, id):
        sensor = Sensor.query.filter_by(id=id).first()
        if sensor:
            db.session.delete(sensor)
            db.session.commit()
            return {'message': 'Sensor excluído'}
        return {'message': 'Sensor inexistente'}, 404
