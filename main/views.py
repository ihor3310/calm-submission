from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

def home(request):
    return render(request, 'index.html')

class QueueListView(APIView):
    def get(self, request):
        return Response({"queues": []})

class QueueDetailView(APIView):
    def get(self, request, pk):
        return Response({"queue": pk})

class QueueEntryListView(APIView):
    def get(self, request):
        return Response({"entries": []})

class QueueEntryDetailView(APIView):
    def get(self, request, pk):
        return Response({"entry": pk})

def get_csrf_token(request):
    return HttpResponse("CSRF endpoint")

def register_user(request):
    return HttpResponse("Register endpoint (фронт реалізує форму)")

def user_profile(request):
    return HttpResponse("User profile endpoint")
