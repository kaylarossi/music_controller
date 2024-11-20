from django.shortcuts import render
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response

# view already set up to return all avail rooms
class RoomView(generics.ListAPIView):
    queryset = Room.objects.all();
    #form to return
    serializer_class = RoomSerializer

class CreateRoomView(APIView):
    serializer_class=CreateRoomSerializer

    def post(self, request, format=None):
        #if user doesn't already have an open session, create one
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        # serialize all the data from post request and check if valid
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key
            #query to see if host has a session already
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                #if have session, update session with new fields and save
                room=queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
                return Response(RoomSerializer(room).data,status=status.HTTP_200_OK)
            else:
                #else create new room
                room = Room(host=host, guest_can_pause=guest_can_pause,
                    votes_to_skip=votes_to_skip)
                room.save()
                return Response(RoomSerializer(room).data,status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
