from survaider.survey.model import ClientAspects
from survaider.survey.model import ClientProviders

class Providers():
    providers=[]
    def get(self, parent_id):
        # print ("calling P for ", parent_id)
        obj = ClientProviders.objects(parent_id = parent_id)
        # print ("providers",obj)
        self.providers = obj[0].providers
        return self.providers
    def add(self,element):
        self.providers.append(element)
            
class Aspects():
    aspects=[]
    def get(self, parent_id):
        obj = ClientAspects.objects(parent_id = parent_id)
        self.aspects = obj[0].aspects
        return self.aspects
    def add(self,element):
        self.aspects.append(element)