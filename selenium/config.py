from selenium import webdriver

class Config():

    def __init__(self):
        self.base_url = 'http://localhost:4200'
        options = webdriver.ChromeOptions()
        options.add_argument('--ignore-certificate-errors')
        options.add_argument("--test-type")
        #options.add_argument("--headless")
        self.driver = webdriver.Chrome(options=options)