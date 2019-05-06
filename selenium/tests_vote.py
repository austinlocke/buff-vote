import unittest
import time
from localdata import password_local, username_local
from utils import login, create_poll

from config import Config
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException, TimeoutException


class VoteTests(unittest.TestCase):

    def setUp(self):
        # Shared config object for tests
        self.conf = Config()

    def test_vote(self):
        driver = self.conf.driver
        driver.get(self.conf.base_url)

        # Log in to app using localdata credentials. Must define credentials inside localdata.py yourself
        # Then create poll to vote in, incase there is no poll active
        login(driver)
        create_poll(driver)
        public_polls_btn = driver.find_element_by_id("public-poll")
        public_polls_btn.click()

        # Wait for polls to load
        WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.CLASS_NAME, "pollBox")))

        # Should be atleast 1 poll at this point if create poll was successful
        polls = driver.find_elements_by_class_name("pollBox")
        my_poll = polls[-1] # Select last one since it is the most recent

        my_poll.click()

        # Wait for question to load
        WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.CLASS_NAME, "option")))
        options = driver.find_elements_by_class_name("option")
        my_option = options[-1]
        my_option.click()

        submit_btn = driver.find_element_by_id("submit-btn")
        submit_btn.click()

        try:
            success = WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.CLASS_NAME, 'alert-success')))
        except NoSuchElementException:
            print("Error: Could not find element")
        except TimeoutException:
            print("Driver timed out")

        # Assert we get proper success message and director to the homepage
        assert "You successfully voted in poll \"Test Poll by Automated User\"." in success.text
        assert driver.current_url == "http://localhost:4200/homepage"

    def tearDown(self):
        self.conf.driver.close()

if __name__ == "__main__":
    unittest.main()
