import unittest
import time
from localdata import password_local, username_local
from config import Config
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException, TimeoutException

class LogInTests(unittest.TestCase):

    def setUp(self):
        # Shared config object for tests
        self.conf = Config()

    def test_login_successful(self):
        driver = self.conf.driver
        driver.get(self.conf.base_url)
        
        login = driver.find_element_by_id('login')
        # Grab username from local file. Do not store in repo.
        login.send_keys(username_local)

        password = driver.find_element_by_id('password')
        # Grab password from local file. Do not store in repo.
        password.send_keys(password_local)

        submit_btn = driver.find_element_by_id('login-btn')
        submit_btn.click()
        try:
            welcome = WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.ID, 'welcome-text')))
        except NoSuchElementException:
            print("Error: Could not find element")
        except TimeoutException:
            print("Driver timed out")

        # If successful login, we should see welcome text and should be at homepage
        assert welcome.text == "Welcome, Austin!"
        assert driver.current_url == 'http://localhost:4200/homepage'

    def test_login_failed(self):
        driver = self.conf.driver
        driver.get(self.conf.base_url)
        
        login = driver.find_element_by_id('login')
        login.send_keys(username_local)

        password = driver.find_element_by_id('password')
        # Send an incorrect password
        password.send_keys("badpassword")

        submit_btn = driver.find_element_by_id('login-btn')
        submit_btn.click()

        try:
            error = WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.CLASS_NAME, 'alert-danger')))
        except NoSuchElementException:
            print("Error: Could not find element")
        except TimeoutException:
            print("Driver timed out")

        assert "You have entered an invalid email or password." in error.text
        assert driver.current_url == "http://localhost:4200/"

    def tearDown(self):
        self.conf.driver.close()

if __name__ == "__main__":
    unittest.main()
