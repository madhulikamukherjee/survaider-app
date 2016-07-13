from survaider.survey.model import ClientAspects

class Providers():
    providers=["tripadvisor", "zomato", "HolidayIQ"]
    def get(self):
        return self.providers
    def add(self,element):
        self.providers.append(element)
            
class Aspects():
    aspects=[]
    def get(self, parent_id):
        obj = ClientAspects.objects()
        self.aspects = obj[0].aspects
        return self.aspects
    def add(self,element):
        self.aspects.append(element)