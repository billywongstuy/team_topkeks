pkill gunicorn
gunicorn -w 4 -b unix:/tmp/website.sock -m 005 api:app --daemon &> /dev/null
