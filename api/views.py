
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
import requests
from django_filters import rest_framework as filters
from rest_framework import status, generics, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import *
from users.serializers import CompensationFullSerializer
from users.models import Transfert
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import *
from .filters import *
import json
# Create your views here.


class CommuneAPIViews(generics.ListAPIView):
    serializer_class = CommuneSerializer
    permission_classes = [AllowAny]
    queryset = Commune.objects.all()

# agences views


class AgenceListAPIViews(generics.ListAPIView):
    serializer_class = AgenceFullSerializer
    permission_classes = [AllowAny]
    queryset = Agence.objects.all()
    filterset_class = AgenceFilter


class AgenceRetriveAPIViews(generics.RetrieveAPIView):
    serializer_class = AgenceFullSerializer
    permission_classes = [AllowAny]
    queryset = Agence.objects.all()


class AgenceUpdateAPIViews(generics.RetrieveUpdateAPIView):
    serializer_class = AgenceSerializer
    permission_classes = [AllowAny]
    queryset = Agence.objects.all()

# clients views


class ClientViewsets(viewsets.ModelViewSet):
    serializer_class = ClientSerializer
    permission_classes = [AllowAny]
    queryset = Client.objects.all()

# transferts views


class TransfertListAPIViews(generics.ListAPIView):
    serializer_class = TransfertFullSerializer
    permission_classes = [AllowAny]
    queryset = Transfert.objects.all().order_by('-date_creation')
    filterset_class = TransfertFilter


class TransfertCreateAPIViews(generics.CreateAPIView):
    serializer_class = TransfertSerializer
    permission_classes = [AllowAny]
    queryset = Transfert.objects.all()


class TransfertRetriveAPIViews(generics.RetrieveAPIView):
    serializer_class = TransfertFullSerializer
    permission_classes = [AllowAny]
    queryset = Transfert.objects.all()


class TransfertUpdateAPIViews(generics.RetrieveUpdateAPIView):
    serializer_class = TransfertSerializer
    permission_classes = [AllowAny]
    queryset = Transfert.objects.all()


class TransfertDeleteAPIViews(generics.DestroyAPIView):
    serializer_class = TransfertSerializer
    permission_classes = [AllowAny]
    queryset = Transfert.objects.all()

# compensation views


class CompensationListAPIViews(generics.ListAPIView):
    serializer_class = CompensationFullSerializer
    permission_classes = [AllowAny]
    queryset = Compensation.objects.all()
    filterset_class = CompensationFilter


class CompensationCreateAPIViews(generics.CreateAPIView):
    serializer_class = CompensationSerializer
    permission_classes = [AllowAny]
    queryset = Compensation.objects.all()


class CompensationRetriveAPIViews(generics.RetrieveAPIView):
    serializer_class = CompensationFullSerializer
    permission_classes = [AllowAny]
    queryset = Compensation.objects.all()


class CompensationUpdateAPIViews(generics.RetrieveUpdateAPIView):
    serializer_class = CompensationSerializer
    permission_classes = [AllowAny]
    queryset = Compensation.objects.all()


# clotures views
class ClotureViewsets(viewsets.ModelViewSet):
    serializer_class = ClotureSerializer
    permission_classes = [AllowAny]
    queryset = Cloture.objects.all()
    filterset_class = ClotureFilter

# transactions views


class TransactionListAPIViews(generics.ListAPIView):
    serializer_class = TransactionFullSerializer
    permission_classes = [AllowAny]
    queryset = Transaction.objects.all().order_by('-date')
    filterset_class = TransactionFilter

    def list(self, request):
        serializer = self.serializer_class(
            self.filter_queryset(self.get_queryset()), many=True)

        data = []
        # print(serializer.data)
        for d in serializer.data:
            # if d['type_transaction'] == Transaction.RETRAIT or d['type_transaction'] == Transaction.SUP_3000 or d['type_transaction'] == Transaction.INF_3000:
            if 'categorie_transaction' in list(d.keys()):
                transfert = Transfert.objects.get(id=d['transaction'])
                d['transaction'] = TransfertFullSerializer(transfert).data
                data.append(d)
            elif 'type_transaction' in list(d.keys()):
                compensation = Compensation.objects.get(id=d['transaction'])
                d['transaction'] = CompensationFullSerializer(
                    compensation).data
                data.append(d)
            else:
                data.append(d)
        return Response(data)


class TransactionRetriveAPIViews(generics.RetrieveAPIView):
    serializer_class = TransactionFullSerializer
    permission_classes = [AllowAny]
    queryset = Transaction.objects

    def get(self, request, pk):
        serializer = self.serializer_class(
            self.get_queryset().get(id=pk), many=False)

        d = serializer.data
        if 'categorie_transaction' in list(d.keys()):
            transfert = Transfert.objects.get(id=d['transaction'])
            d['transaction'] = TransfertFullSerializer(transfert).data
            return Response(d)
        elif 'type_transaction' in list(d.keys()):
            compensation = Compensation.objects.get(id=d['transaction'])
            d['transaction'] = CompensationFullSerializer(compensation).data
            return Response(d)
        else:
            return Response(d)


class TransactionCreateAPIViews(generics.CreateAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [AllowAny]
    queryset = Transaction.objects.all()


####
def home(request):
    return render(request, 'index.html')
