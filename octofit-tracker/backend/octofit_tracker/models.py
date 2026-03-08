from djongo import models

class Team(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    def __str__(self):
        return self.name

class User(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=100)
    team = models.CharField(max_length=24, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    def __str__(self):
        return self.username

class Activity(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    user = models.CharField(max_length=24)
    activity_type = models.CharField(max_length=100)
    duration = models.IntegerField()  # minutes
    date = models.DateField()
    def __str__(self):
        return f"{self.activity_type}"

class Workout(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    suggested_for = models.ArrayReferenceField(to=User, on_delete=models.CASCADE, blank=True)
    def __str__(self):
        return self.name

class Leaderboard(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    team = models.CharField(max_length=24)
    points = models.IntegerField(default=0)
    def __str__(self):
        return f"{self.points}"
