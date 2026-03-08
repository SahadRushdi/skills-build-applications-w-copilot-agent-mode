from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from datetime import date

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        Activity.objects.all().delete()
        Workout.objects.all().delete()
        Leaderboard.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name='Marvel', description='Marvel superheroes')
        dc = Team.objects.create(name='DC', description='DC superheroes')

        # Create users
        ironman = User.objects.create(email='ironman@marvel.com', username='IronMan', team=marvel)
        captain = User.objects.create(email='captain@marvel.com', username='CaptainAmerica', team=marvel)
        batman = User.objects.create(email='batman@dc.com', username='Batman', team=dc)
        superman = User.objects.create(email='superman@dc.com', username='Superman', team=dc)

        # Create activities
        Activity.objects.create(user=ironman, activity_type='Running', duration=30, date=date.today())
        Activity.objects.create(user=captain, activity_type='Cycling', duration=45, date=date.today())
        Activity.objects.create(user=batman, activity_type='Swimming', duration=25, date=date.today())
        Activity.objects.create(user=superman, activity_type='Weightlifting', duration=60, date=date.today())

        # Create workouts
        pushups = Workout.objects.create(name='Pushups', description='Upper body workout')
        pushups.suggested_for.set([ironman, captain])
        squats = Workout.objects.create(name='Squats', description='Lower body workout')
        squats.suggested_for.set([batman, superman])

        # Create leaderboard
        Leaderboard.objects.create(team=marvel, points=150)
        Leaderboard.objects.create(team=dc, points=120)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with superhero test data'))
