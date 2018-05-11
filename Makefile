#MakeFile to build and deploy the tictactoe server and testclient
# For CSC3004 Software Development

# Put your user name below:
USER= solorioc

CC= g++

#For Optimization
#CFLAGS= -O2
#For debugging
CFLAGS= -g

RM= /bin/rm -f

all: PutHTML

PutHTML:
	cp volunteer_schedule.html /var/www/html/class/ssd/$(USER)/WS_Volunteer_Scheduling/

	cp volunteer_schedule.js /var/www/html/class/ssd/$(USER)/WS_Volunteer_Scheduling/

	cp volunteer_schedule.css  /var/www/html/class/ssd/$(USER)/WS_Volunteer_Scheduling/


clean:
	rm -f *.o
