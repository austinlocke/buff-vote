import unittest
import time
from utils import verify_exists_id
from localdata import password_local
from config import Config
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException, TimeoutException

class RegisterTests(unittest.TestCase):

    def setUp(self):
        # Shared config object for tests
        self.conf = Config()

    def test_register_form(self):
        driver = self.conf.driver
        driver.get(self.conf.base_url)

        # Verity all fields load properly on register form using util function
        assert verify_exists_id(driver, 'fname-selector')
        assert verify_exists_id(driver, 'lname-selector')
        assert verify_exists_id(driver, 'email-selector')
        assert verify_exists_id(driver, 'password-selector')
        assert verify_exists_id(driver, 'confirm-pass-selector')
        assert verify_exists_id(driver, 'college-selector')
        assert verify_exists_id(driver, 'major-selector')
        assert verify_exists_id(driver, 'city-selector')
        assert verify_exists_id(driver, 'state-selector')
        assert verify_exists_id(driver, 'zip-selector')
        assert verify_exists_id(driver, 'user-selector')
        assert verify_exists_id(driver, 'classification-selector')
        assert verify_exists_id(driver, 'submit-form-btn')

    def tearDown(self):
        self.conf.driver.close()

if __name__ == "__main__":
    unittest.main()
