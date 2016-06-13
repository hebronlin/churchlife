Installation
----------------

**Make sure you have the latest package lists**:

    #) sudo apt-get update

**Install Git as root**:

    #) sudo apt-get install git

**Configure Git**:

    #) git config --global user.name <user_name>
    #) git config --global user.email <user_email>

**Create Git SSH Key**:

    #) Follow instructions as described at <http://help.github.com/articles/generating-ssh-keys>

**Create working folder**:
    #) mkdir mswe1
    #) cd mswe1
    #) git clone https://github.com/hebronlin/churchlife.git

**Install Dev libraries as root**:

    #) sudo apt-get install python3-dev
    #) sudo apt-get install libffi-dev
    #) sudo apt-get install libxml2-dev
    #) sudo apt-get install libxslt1-dev
    #) sudo apt-get install python-pip

**Install virtualenv as root**:

    #) sudo pip install virtualenv

**Install Postgresql as root**:

    #) sudo apt-get install postgresql postgresql-contrib
    #) sudo apt-get install python-psycopg2
    #) sudo apt-get install libpq-dev

**Modify /var/lib/pgsql/9.3/data/pg_hba.conf to allow local connections. In the section below, change all methods from md5 to trust**:
    #) sudo vim /etc/postgresql/9.3/main/pg_hba.conf
```
    # TYPE  DATABASE    USER        CIDR-ADDRESS          METHOD

    # "local" is for Unix domain socket connections only
    local   all         all                               trust
    # IPv4 local connections:
    host    all         all         127.0.0.1/32          trust
    # IPv6 local connections:
    host    all         all         ::1/128               trust
```
    #) sudo service postgresql restart

**Create database user for Postgres**:
    #) sudo su - postgres
    #) createuser -P -d app_user
    #) psql -U 'app_user' -c "DROP DATABASE IF EXISTS churchlife" template1
    #) createdb -U app_user -E UTF8 --owner app_user churchlife
    #) psql -U 'app_user' -d churchlife -f churchlife.sql

**Create a virtual environment for churchlife**:
    #) vim sourceme
    Enter the following settings:
        export DJANGO_SETTINGS_MODULE=churchlife.settings.base
        export PYTHONPATH=~/mswe1:~/mswe1/churchlife
    Save & Exit
    #) virtualenv churchlife.env -p /usr/bin/python3.4
    #) source churchlife.env/bin/activate
    #) source sourceme
    #) cd churchlife
    #) pip install -r requirements.txt

**Install node and bundle Javascript**:
    #) cd core/apps
    #) npm install
    #) npm run browserify

**Start the django server**:
    #) django-admin runserver 0.0.0.0:8081
