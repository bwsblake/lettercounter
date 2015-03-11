from lettercounter.models import Count
#from rest_framework import viewsets
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from lettercounter.counters.serializers import CountSerializer
from django.db.models import Sum, F, IntegerField


#class CountViewSet(viewsets.ModelViewSet):
#    """
#    API endpoint that allows counts to be viewed or edited.
#    """
#    queryset = Count.objects.all()
#    serializer_class = CounterSerializer

class CountList(APIView):
    """
    List all counts, or create a new count entry.
    """
    def get(self, request, format=None):
        counts = Count.objects.all()
        serializer = CountSerializer(counts, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = CountSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CountDetail(APIView):
    """
    Retrieve, update or delete a count instance.
    """
    def get_object(self, pk):
        try:
            return Count.objects.get(letter=str(pk).upper())
        except Count.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        count = self.get_object(pk)
        serializer = CountSerializer(count)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        count = self.get_object(pk)
        serializer = CountSerializer(count, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        count = self.get_object(pk)
        count.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class StatsDetail(APIView):
    """
    Retrieve statistics on letters stored
    """
    def get(self, request, format=None):
        counts = Count.objects.all()
        total = Count.objects.all().aggregate(total=Sum('count'))
        total = total['total']

        serializer = CountSerializer(counts, many=True)

        nodes = serializer.data

        percentages = dict()

        for node in nodes:
            percentages[node['letter']] = node['count']/total

        return Response(percentages)


class SentenceDetail(APIView):
    """
    Process and store a sentence
    """
    def get_letter_count(self, letter):
        try:
            record = Count.objects.get(letter=str(letter).upper())
            return record.count
        except Count.DoesNotExist:
            return 0

    @staticmethod
    def char_range(c1, c2):
        """Generates the characters from `c1` to `c2`, inclusive."""
        for c in xrange(ord(c1), ord(c2)+1):
            yield chr(c)

    def put(self, request, format=None):
        sentence = str(request.data['sentence'])

        sentence = sentence.upper()
        sentence = sentence.replace(' ', '')

        letters = dict()

        for letter in sentence:
            if letter in self.char_range('A', 'Z'):
                if letter not in letters:
                    letters[letter] = self.get_letter_count(letter) + 1
                else:
                    letters[letter] += 1

        for letter, count in letters.iteritems():
            try:
                record = Count.objects.get(letter=letter)

                serializer = CountSerializer(record, data=dict(letter=letter, count=count))
            except Count.DoesNotExist:
                serializer = CountSerializer(data=dict(letter=letter, count=count))

            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            serializer.save()

        counts = Count.objects.all()
        serializer = CountSerializer(counts, many=True)
        return Response(serializer.data)