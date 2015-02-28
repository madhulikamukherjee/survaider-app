# Serves as the openshift setup
from setuptools import setup

setup (
    name = 'Surviader Alpha',
    version = '0.1',
    author = 'Prashant Sinha',
    author_email = 'prashant@ducic.ac.in',
    install_requires = [
        'Flask>=0.7.2',
        'pymongo'
    ],
)