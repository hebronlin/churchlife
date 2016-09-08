from django.utils.translation import ugettext_lazy as _

GENDER_CHOICES = (('M', _('Male')), ('F', _('Female')))

LANGUAGE_CHOICES = (('English', _('English')),
					('Chinese', _('Chinese')),
					('Korean', _('Korean')),
					('Spanish', _('Spanish')),
					('Vietnanese', _('Vietnanese')),
				   )

MEMBER_STATUS_CHOICES = (('Junior High', _('Junior High')),
                  ('High School', _('High School')),
                  ('College Student', _('College Student')),
                  ('Full-timer', _('Full-timer')),
                  ('Working Saint', _('Working Saint')),
                  ('Others', _('Others')),
                 )

MEMBER_TYPE_CHOICES = (('Member', _('Member')),
					   ('Guest', _('Guest')),
                       ('ReportAdmin', _('ReportAdmin')),
					   ('Admin', _('Admin')),
					  )

GROUP_TYPE_CHOICES = (('Home Group', _('Home Group')),
					  ('Attendance Group', _('Attendance Group')),
					  ('Report Group', _('Report Group')),
					 )

EVENT_STATUS_CHOICES = (('Active', _('Active')),
						('Inactive', _('Inactive')),
						('Completed', _('Completed')),
					   )

EVENT_TYPE_CHOICES = (('Daily', _('Daily')),
					  ('Weekly', _('Weekly')),
					  ('Monthly', _('Monthly')),
					  ('Yearly', _('Yearly')),
					 )

ABSENT_REASON_CHOICES = (('Unknown', _('Unknown')),
					     ('Sick', _('Sick')),
					     ('In Service', _('In Service')),
                         ('Travel', _('Travel')),
					    )