from survaider.survey.model import AspectQ

class Providers():
    providers=["tripadvisor", "zomato", "HolidayIQ"]
    def get(self):
        return self.providers
    def add(self,element):
        self.providers.append(element)
            
class Aspects():
    aspects=[]
    def get(self, parent_id):
        # obj = AspectQ.objects(parent_id = parent_id)
        # print ("hello")
        # print (len(obj))
        # print ("bye")
        # self.aspects = obj[0].aspect_notation
        self.aspects = ["amenities", "ambience", "value_for_money", "room_service", "cleanliness"]
        return self.aspects
    def add(self,element):
        self.aspects.append(element)