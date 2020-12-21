from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status, generics, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import *
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from users.models import MyUser

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


'''
class Student_UserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        serializer = Student_UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            print(user)
            if user:
                #json = serializer.data
                return Response({'msg': "Student Created succefuly"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Current_Student_API(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StudentSerializer

    def get_object(self):
        return Student.objects.get(user=self.request.user)


class Teacher_UserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        serializer = Teacher_UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            print(user)
            if user:
                #json = serializer.data
                return Response({'msg': "Teacher Created succefuly"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Current_Teacher_API(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TeacherSerializer

    def get_object(self):
        return Teacher.objects.get(user=self.request.user)


class GetUserViewsets(generics.RetrieveAPIView):
    serializer_class = New_UserSerializer
    permission_classes = [IsAuthenticated]
    queryset = NewUser.objects.all()

'''


class ListUserViewsets(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    queryset = MyUser.objects.all()

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
