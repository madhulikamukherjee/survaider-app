from urllib.request import urlopen
from bs4 import BeautifulSoup
import json
import requests
from survaider.ml.datum import DatumBox
from collections import Counter
api_base_url="https://developers.zomato.com/api/v2.1/"
api_key="3fae2a3d5cbf4920b04ab01873a03fdb"
class Zomato(object):
	"""docstring for Zomato"""
	def __init__(self,url):
		self.url= url
	def get_id(self):
		response= urlopen(self.url).read()
		soup=BeautifulSoup(response,"lxml")
		rid= int(soup.find('body')['itemid'])
		return rid
	def get_reviews(self):
		api_url= api_base_url+"reviews"
		rid=self.get_id()
		steps="0"
		url= api_url+"?res_id="+str(rid)+"&start="+steps
		header = {"User-agent": "curl/7.43.0", "Accept": "application/json", "user-key":api_key}
		response=requests.get(url,headers=header)
		total_Reviews=int(response.json()['reviews_count'])
		steps=int(total_Reviews/5)
		count=0
		responses=[]
		total_keywords=Counter({})
		for x in range(0,steps):
			url= api_url+"?res_id="+str(rid)+"&start="+str(count)
			response=requests.get(url,headers=header)
			responses.append(response.json())
			words=""

			for i in response.json()['user_reviews']:
				words+=i['review']['review_text']
			datum = DatumBox()
			keywords=Counter(datum.get_keywords(words))
			total_keywords+=keywords
			print (total_keywords.most_common(20))
			count+=5
		return responses
	def extract_text(self):
		responses=self.get_reviews()
		reviews=""
		for x in responses:	
			raw= i['user_reviews']
			
			for i in raw:
				reviews+=i['review_text']
		return reviews


# test_url="https://www.zomato.com/ncr/smokeys-bbq-and-grill-dlf-cyber-city-gurgaon"
# test= Zomato(test_url)
# test.get_reviews()

		