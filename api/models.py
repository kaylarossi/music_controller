from django.db import models
import string
import random




# Create your models here.
class Room(models.Model):
    code = models.CharField(max_length=8, default=None, unique=True)
    # one host cannot have multiple rooms
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at =models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.code:
            self.code=self.generate_unique_code()
        super(Room, self).save(*args, **kwargs)


    def generate_unique_code(self):
        length = 6
        while True:
            # generate a code of length k of only uppercase ascii characters
            code = ''.join(random.choices(string.ascii_uppercase, k=length))
            # look at all the Room objects to make sure code isn't in use elsewhere
            if Room.objects.filter(code=code).exists():
                return code
