from django.db import models

class MemberManager(models.Manager):
    """Custom manager for the MemberProfile model."""

    def create_inactive_user(self, locality, username, email, password):
        new_user = User.objects.create_user(username, email, password)
        new_user.is_active = False
        new_user.save()
        profile = self.create_profile(new_user, account)
        new_user.profile = profile
        new_user.save()
        return new_user

    def create_profile(self, user, locality):
        """Create a MemberProfile for a given User.
        """
        # The profile must already exists, since the user's save
        # method will create the profile through a post_save signal.
        try:
            profile = self.get(user=user)
        except self.model.DoesNotExist:
            profile = self.create(user=user)

        profile.locality = locality
        profile.save()

        return profile
