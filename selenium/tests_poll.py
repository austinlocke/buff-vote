import unittest
import time
from localdata import password_local, username_local
from utils import login

from config import Config
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException, TimeoutException


class PollTests(unittest.TestCase):

    def setUp(self):
        # Shared config object for tests
        self.conf = Config()

    def test_create_poll(self):
        driver = self.conf.driver
        driver.get(self.conf.base_url)

        # Log in to app using localdata credentials. Must define credentials inside localdata.py yourself
        login(driver)
        create_poll_btn = driver.find_element_by_id("create-poll")
        create_poll_btn.click()

        poll_name = driver.find_element_by_id("poll-name-selector")
        poll_name.send_keys("Test Poll by Automated User")

        student_access = driver.find_element_by_id("student")
        student_access.click()

        faculty_access = driver.find_element_by_id("faculty")
        faculty_access.click()

        instructor_access = driver.find_element_by_id("instructor")
        instructor_access.click()

        next_btn = driver.find_element_by_id("next-btn")
        next_btn.click()

        question_title = driver.find_element_by_id("question-title-selector0")
        question_title.send_keys("Test Question")

        option1 = driver.find_element_by_id("option00")
        option1.send_keys("Test Option 1")

        option2 = driver.find_element_by_id("option01")
        option2.send_keys("Test Option 2")

        submit_poll = driver.find_element_by_id("submit-poll-btn")
        submit_poll.click()

        try:
            success = WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.CLASS_NAME, 'alert-success')))
        except NoSuchElementException:
            print("Error: Could not find element")
        except TimeoutException:
            print("Driver timed out")

        # Assert we get proper success message and director to the manage poll screen
        assert "The poll \"Test Poll by Automated User\" was created successfully." in success.text
        assert driver.current_url == "http://localhost:4200/manage-polls"

    def test_view_public_polls(self):
        driver = self.conf.driver
        driver.get(self.conf.base_url)

        # Log in to app using localdata credentials. Must define credentials inside localdata.py yourself
        login(driver)
        public_polls_btn = driver.find_element_by_id("public-poll")
        public_polls_btn.click()

        heading = driver.find_element_by_xpath("//*[@id=\"title\"]/strong")

        # Ensure clicking on public poll in dashboard brings you to the view poll page with proper heading.
        assert "Public Polls/Elections" in heading.text
        assert driver.current_url == "http://localhost:4200/view-polls"



    def tearDown(self):
        self.conf.driver.close()

if __name__ == "__main__":
    unittest.main()
