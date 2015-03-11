from lettercounter.models import Count
from rest_framework import serializers


class CountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Count
        fields = ('letter', 'count')