import unittest
import time
from localdata import password_local, username_local
from utils import verify_exists_class, login, create_poll

from config import Config
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException, TimeoutException


class ResutlsTests(unittest.TestCase):

    def setUp(self):
        # Shared config object for tests
        self.conf = Config()

    def test_view_results(self):
        driver = self.conf.driver
        driver.get(self.conf.base_url)

        login(driver)

        results_btn = driver.find_element_by_id("previous-poll")
        results_btn.click()

        heading = driver.find_element_by_xpath("//*[@id=\"title\"]/strong")

        # Ensure clicking on previous poll in dashboard brings you to the view ended polls page
        assert "Ended Polls/Elections" in heading.text
        assert driver.current_url == "http://localhost:4200/poll-results"

        # Wait for all the polls to load
        WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.CLASS_NAME, "pollBox")))
        polls = driver.find_elements_by_class_name("pollBox")
        my_poll = polls[-1] # Select last ended poll
        my_poll.click()

        assert verify_exists_class(driver, "winner")
        assert "http://localhost:4200/view-single-poll/" in driver.current_url


    def tearDown(self):
        self.conf.driver.close()

if __name__ == "__main__":
    unittest.main()
