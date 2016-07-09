class Providers():
    providers=["tripadvisor", "zomato"]
    def get(self):
        print(self.providers)
        return self.providers
    def add(self,element):
        self.providers.append(element)
class Aspects():
    aspects=["ambience","value_for_money","room_service","cleanliness","amenities"]
    def get(self):
        print(self.aspects)
        return self.aspects
    def add(self,element):
        self.aspects.append(element)
