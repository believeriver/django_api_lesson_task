import requests
import logging
import sys

logging.basicConfig(level=logging.DEBUG, stream=sys.stdout)
logger = logging.getLogger(__name__)


def fetch_token(_username: str, _password: str):
    _url = 'http://127.0.0.1:8000/authen/jwt/create'
    response = requests.post(_url, data={
        'username': _username,
        'password': _password,
    })
    logger.debug({'fetch jwt token status': requests.status_codes})
    return response.json().get('access')


if __name__ == '__main__':
    username = 'user02'
    password = 'user02'

    token = fetch_token(username, password)
    print({'Authorization JWT': token})


