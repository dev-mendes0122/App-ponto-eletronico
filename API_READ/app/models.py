from app import db
from datetime import datetime, timedelta

class Sensor(db.Model):
    __tablename__ = "sensor"
    id = db.Column(db.Integer, primary_key=True)

    usuario = db.Column(db.String(255), nullable=False)
    movimento = db.Column(db.String(20), nullable=False)
    dados = db.Column(db.String(255), nullable=False)
    data = db.Column(db.DateTime, default=db.func.current_timestamp())
    horas_trabalhadas = db.Column(db.Interval)

    def json(self):
        return {
            'id': self.id,
            'usuario': self.usuario,
            'movimento': self.movimento,
            'dados': self.dados,
            'data': self.data.isoformat() if self.data else None,
            'horas_trabalhadas': str(self.horas_trabalhadas) if self.horas_trabalhadas else None
        }
