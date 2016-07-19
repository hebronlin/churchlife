from django.utils.translation import ugettext_lazy as _

GENDER_CHOICES = (('M', _('Male')), ('F', _('Female')))

LANGUAGE_CHOICES = (('English', _('English')),
					('Chinese', _('Chinese')),
					('Korean', _('Korean')),
					('Spanish', _('Spanish')),
					('Vietnanese', _('Vietnanese')),
				   )

STATUS_CHOICES = (('Junior High', _('Junior High')),
                  ('High School', _('High School')),
                  ('College Student', _('College Student')),
                  ('Full-timer', _('Full-timer')),
                  ('Working Saint', _('Working Saint')),
                  ('Others', _('Others')),
                 )

MEMBER_TYPE_CHOICES = (('Member', _('Member')),
					   ('Guest', _('Guest')),
					   ('Admin', _('Admin')),
					  )

ABSENT_REASON_CHOICES = (('Unknown', _('Unknown')),
					     ('Sick', _('Sick')),
					     ('In Service', _('In Service')),
                         ('Travel', _('Travel')),
					    )