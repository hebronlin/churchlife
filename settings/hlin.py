from churchlife.settings.base import *

# Database
if 'test' in sys.argv:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }
else:
    DATABASES = {
        # Postgres Local
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': 'churchlife',
            'USER': 'app_user',
            'PASSWORD': 'admin',
            'HOST': 'localhost',
            'PORT': '5432',
        }
        # 'default': {
        #     'ENGINE': 'django.db.backends.mysql',     # Add 'postgresql_psycopg2', 'postgresql', 'mysql', 'sqlite3' or 'oracle'.
        #     'NAME': 'churchlife',                      # Or path to database file if using sqlite3.
        #     'TEST_NAME': 'churchlife',
        #     'USER': 'app_user',                   # Not used with sqlite3.
        #     'PASSWORD': 'admin',               # Not used with sqlite3.
        #     'HOST': 'localhost',          # Set to empty string for localhost. Not used with sqlite3.
        #     'PORT': '',                        # Set to empty string for default. Not used with sqlite3.
        #     'OPTIONS': { 'init_command': 'SET storage_engine=INNODB', }
        # }
    }
