import datetime

def get_start_of_week(day):
	weekday = day.weekday() + 1
	start_delta = datetime.timedelta(days=weekday)
	start_of_week = day - start_delta
	return start_of_week

