"""
Datumbox wrapper function for the Datumbox API

@author: Zurez

"""
import requests
import os
#Configs
base_url="http://api.datumbox.com"
ver="/1.0/"
url= base_url+ver
api_key="83d10dad2aac71006a9e348f43898c82"
filename="stopwords.txt"
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
newfilename = os.path.join(BASE_DIR,filename)
class DatumBox(object):
    """docstring for Datumbox"""
    def get_sentiment(self,text):
        parameters={'api_key':api_key,'text':text}
        req=requests.get(url+"SentimentAnalysis.json",params=parameters)
        return req.json()['output']['result']
    def get_keywords(self,text,n=2):
    	#n is n-gram
    	text= text.lower()
    	stop = open(newfilename,'r').read()
    	
    	aList=[i for i in text.split() if i not in stop]
    	cleaned_text= " ".join(aList)
    	#print cleaned_text
    	parameters={'api_key':api_key,'n':n,'text':cleaned_text}
    	req=requests.get(url+"KeywordExtraction.json",params=parameters)
    	return req.json()['output']['result']['1']
#TESTING
# d= DatumBox()
# text= "I am so funny . i think I will die,what do you think?"
# print d.get_keywords(text)

if __name__ == '__main__':
    main()