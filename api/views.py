from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from .models import HOST
from django.shortcuts import render
from django.middleware import csrf
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


def send_request(url, data, method, headers=None):
    if method == 'POST':
        response = requests.post(url, data=data)
    elif method == 'PUT':
        response = requests.put(url, data=data)
    elif method == 'GET':
        response = requests.get(url)
    elif method == 'DELETE':
        response = requests.delete(url)
        return [{}, response.status_code]

    result = response.json()
    return [result, response.status_code]


@csrf_exempt
# @ensure_csrf_cookie
def add_transfert(request):
    # headers = {
    #     'X-CSRFToken': csrf.get_token(request)
    # }

    # headers={'Authorization': 'access_token myToken'}

    if request.method == 'POST':

        #form = request.POST['data']
        #data = json.loads(form)
        data = json.loads(request.body.decode('utf-8'))
        # if data['type_transaction'] == Transfert.INF_3000:
        data['status'] = 'NOT_WITHDRAWED'

        add_transfert = send_request(
            HOST + 'api/transfert/create/', data, 'POST')
        if add_transfert[1] == 201:
            data = {
                "categorie_transaction": add_transfert[0]['categorie_transaction'],
                "type_transaction": Transaction.TRANSFERT,
                "date": add_transfert[0]['date_creation'],
                "agence": add_transfert[0]['agence_origine'],
                "transaction": add_transfert[0]['id']
            }
            add_transaction = send_request(
                HOST + 'api/transaction/create/', data, 'POST')

            if add_transaction[1] == 201:
                id_ = str(add_transfert[0]['agence_origine'])
                data = send_request(
                    HOST + 'api/agence/get/'+id_+'/', None, 'GET')
                data = data[0]
                ##
                data['frais'] = data['frais'] + \
                    add_transfert[0]['frais_origine']
                data['solde'] = data['solde'] + add_transfert[0]['montant'] + \
                    add_transfert[0]['frais_origine']
                data['commune'] = data['commune']['commune_code']
                # dette , frais destination ?

                update_agence = send_request(
                    HOST + 'api/agence/update/'+id_+'/', data, 'PUT')

                if update_agence[1] == 200:
                    status = update_agence[1]
                    #result = {}
                    #result['transfert'] = add_transfert[0]
                    # result['transaction'] =
                    result = send_request(
                        HOST + 'api/transaction/get/'+str(add_transaction[0]['id'])+'/', None, 'GET')[0]
                    #result['agence'] = update_agence[0]
                else:
                    status = update_agence[1]
                    result = {}
                    result['transfert'] = add_transfert[0]
                    result['transaction'] = add_transaction[0]
                    result['agence'] = False

                return JsonResponse(result, safe=False, status=status)
            else:
                status = add_transaction[1]
                result = {}
                result['transfert'] = add_transfert[0]
                result['transaction'] = False
                result['agence'] = False
                return JsonResponse(result, safe=False, status=status)
        else:
            status = add_transfert[1]
            result = {}
            result['transfert'] = False
            result['transaction'] = False
            result['agence'] = False
            return JsonResponse(result, safe=False, status=status)
    else:
        return HttpResponse(status=405)


def error_transfert(request):
    if request.method == 'POST':
        form = request.POST['data']
        data = json.loads(form)
        id_ = str(data['id'])
        delete_transfert = send_request(
            HOST + 'api/transfert/delete/'+id_+'/', None, 'DELETE')

        if delete_transfert[1] == 204:
            status = 200
            result = {}
            result['transfert'] = True
        else:
            status = delete_transfert[1]
            result = {}
            result['transfert'] = False
        return JsonResponse(result, safe=False, status=status)
    else:
        return HttpResponse(status=405)


@csrf_exempt
def add_retrait(request):
    if request.method == 'POST':
        #form = request.POST['data']
        #data = json.loads(form)
        data = json.loads(request.body.decode('utf-8'))
        id_ = str(data['id'])

        data = send_request(HOST + 'api/transfert/get/'+id_+'/', None, 'GET')

        if data[1] == 200:
            data = data[0]
            data['agence_destination'] = data['agence_destination']['id']
            data['agence_origine'] = data['agence_origine']['id']
            data['destinataire'] = data['destinataire']['id']
            data['status'] = 'WITHDRAWED'
        else:
            data = data[0]

        add_retrait = send_request(
            HOST + 'api/transfert/update/'+id_+'/', data, 'PUT')

        if add_retrait[1] == 200:
            data = {
                "categorie_transaction": add_retrait[0]['categorie_transaction'],
                "type_transaction": Transaction.RETRAIT,
                "date": add_retrait[0]['date_modifcation'],
                "agence": add_retrait[0]['agence_destination'],
                "transaction": add_retrait[0]['id']
            }
            add_transaction = send_request(
                HOST + 'api/transaction/create/', data, 'POST')

            if add_transaction[1] == 201:
                id_ = str(add_retrait[0]['agence_destination'])
                data = send_request(
                    HOST + 'api/agence/get/'+id_+'/', None, 'GET')
                data = data[0]
                ##
                data['frais'] = data['frais'] + \
                    add_retrait[0]['frais_destination']
                data['solde'] = data['solde'] - add_retrait[0]['montant'] + \
                    add_retrait[0]['frais_destination']
                data['retrait'] = data['retrait'] + add_retrait[0]['montant']

                data['commune'] = data['commune']['commune_code']
                # dette , frais destination ?

                update_agence = send_request(
                    HOST + 'api/agence/update/'+id_+'/', data, 'PUT')

                if update_agence[1] == 200:
                    status = update_agence[1]
                    #result = {}
                    #result['transfert'] = add_retrait[0]
                    # result['transaction']
                    result = send_request(
                        HOST + 'api/transaction/get/'+str(add_transaction[0]['id'])+'/', None, 'GET')[0]
                    #result['agence'] = update_agence[0]
                else:
                    status = update_agence[1]
                    result = {}
                    result['transfert'] = add_retrait[0]
                    result['transaction'] = add_transaction[0]
                    result['agence'] = False

                return JsonResponse(result, safe=False, status=status)
            else:
                status = add_transaction[1]
                result = {}
                result['transfert'] = add_retrait[0]
                result['transaction'] = False
                result['agence'] = False
                return JsonResponse(result, safe=False, status=status)
        else:
            status = add_retrait[1]
            result = {}
            result['transfert'] = False
            result['transaction'] = False
            result['agence'] = False
            return JsonResponse(result, safe=False, status=status)
    else:
        return HttpResponse(status=405)
