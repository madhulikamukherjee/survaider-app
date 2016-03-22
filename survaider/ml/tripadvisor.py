from bs4 import BeautifulSoup
from urllib.request import urlopen
from survaider.ml.datum import DatumBox
from collections import Counter
# import ssl
# from functools import wraps
# def sslwrap(func):
#     @wraps(func)
#     def bar(*args, **kw):
#         kw['ssl_version'] = ssl.PROTOCOL_TLSv1
#         return func(*args, **kw)
#     return bar

# ssl.wrap_socket = sslwrap(ssl.wrap_socket)
class TripAdvisor(object):
	"""docstring for"""
	def __init__(self,url):
		self.url= url
	def last_links(self):
		response= urlopen(self.url).read()
		soup = BeautifulSoup(response)
		links= soup.find_all('a',{'class':'pageNum'})
		# return links
		try:
			return int(links[-1].text)
		except Exception as e:
			return 1
		
	def generate_link(self):
		endvalue= self.last_links()
		links=[self.url]
		if endvalue==1:
			return links
			
		
		add= len('Reviews-')
		marker= self.url.index('Reviews-')+add
		for i in range(1,endvalue):
			new_url= self.url[:marker]+"or"+str(i*10)+"-"+self.url[marker:]
			links.append(new_url)
		return links
	def get_data(self,links):
		# links= self.generate_link()
		base_url="https://www.tripadvisor.in"
		reviews=[]
		for i in links:
			response= urlopen(i).read()
			soup= BeautifulSoup(response)
			review_link=soup.find_all('div',{'class':'quote'})

			for j in review_link:
				rl = j.find("a",href=True)
				review_res= urlopen(base_url+rl['href']).read()
				soup2= BeautifulSoup(review_res)
				rating=soup2.find('img',{'class':'sprite-rating_s_fill'})['alt']
				review= soup2.find('p',{'property':'reviewBody'}).text +"\n"+"#rating: "+ rating
				# print("chunk done")
				reviews.append(review)
		return reviews
	# def main(self):
	# 	counter=0
	# 	links=self.generate_link()
	# 	flag= len(links)
	# 	res=Counter({})
	# 	while counter<flag:
	# 		rev= self.get_data(links[counter:counter+1])
	# 		revtstr= " ".join(rev)
	# 		d= DatumBox()
	# 		# print("datum")
	# 		a= Counter(d.get_keywords(revtstr))
	# 		# print (a[4])
	# 		res= res+a
	# 		most_frequent_words_so_far = Counter(res).most_common(20)
	# 		# print (most_frequent_words_so_far)
	# 		# print (most_frequent_words_so_far)
	# 		counter+=1
	# def make_call(self):
	# 	links= self.generate_link()
	# 	raw_html=[]
	# 	for i in links:
	# 		raw_html.append(urlopen(i).read())
	# 	return raw_html
	# def parse_reviews(self):
	# 	raw_html=self.make_call()
	# 	raw_reviews=[]
	# 	for i in raw_html:
	# 		soup= BeautifulSoup(i)
	# 		raw_reviews.append(soup.find_all('div',{'class':'innerBubble'}))
	# 	return raw_reviews

	# def get_reviews(self):
	# 	raw_reviews= self.make_call()
	# 	# return type(raw_reviews[0])
	# 	base_url= "https://www.tripadvisor.in"
	# 	# return raw_reviews
	# 	result=[]
	# 	return raw_reviews
	# 	for i in raw_reviews:
	# 		soup= BeautifulSoup(i)
	# 		rating=soup.find_all('img',{'class':'spritie_rating_sfill'})
	# 		review_link=base_url+soup.find('div',{'class':'quote'}).find('a',href=True)['href']
	# 		response = urlopen(review_link).read()
	# 		soup = BeautifulSoup(response)
	# 		review= soup.find('p',{'property':'reviewBody'}).text
	# 		result.append((rating,review))
	# 	return result

			


# test_url="https://www.tripadvisor.in/Restaurant_Review-g304551-d1417229-Reviews-Indian_Accent-New_Delhi_National_Capital_Territory_of_Delhi.html"
# test= TripAdvisor(test_url)
# r= test.main()
# # for i in r:
# print(r)
# with open("review_test","wb+") as f:
# 	for i in r:
# 		f.write(bytes(i+"\n", 'UTF-8'))
  # thefile.write("%s\n" % item)
