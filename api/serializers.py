#translate Model (python) into json response
from rest_framework import serializers
from .models import Room

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        #primary key is 'id' field - auto field on models
        fields =['id', 'code', 'host', 'guest_can_pause',
                'votes_to_skip', 'created_at']

class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['guest_can_pause', 'votes_to_skip']
