from django_filters import rest_framework as filters
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status, generics, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import *
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from users.models import MyUser, Employee, Responsable

# login


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# register users


class Agent_UserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        serializer = Agent_UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            print(user)
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Employe_UserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        serializer = Employe_UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            print(user)
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Responsable_UserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        serializer = Responsable_UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            print(user)
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EmployeFilter(filters.FilterSet):
    class Meta:
        model = Employee
        fields = ['agence']


class EmployeListAPIViews(generics.ListAPIView):
    serializer_class = Employe_UserSerializer
    permission_classes = [AllowAny]
    queryset = Employee.objects.all()
    filterset_class = EmployeFilter


class ResponsableRetriveAPIViews(generics.RetrieveAPIView):
    serializer_class = Responsable_UserSerializer
    permission_classes = [AllowAny]
    queryset = Responsable.objects.all()

# logout


class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
