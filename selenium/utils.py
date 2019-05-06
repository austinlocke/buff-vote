from localdata import username_local, password_local
from config import Config
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException, TimeoutException

# Utils file that contains useful functions for testing

def verify_exists_id(driver, id_selector):
    try:
        WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.ID, id_selector)))
        return True
    except NoSuchElementException:
        return False
    except TimeoutException:
        return False

def verify_exists_class(driver, class_selector):
    try:
        WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.CLASS_NAME, class_selector)))
        return True
    except NoSuchElementException:
        return False
    except TimeoutException:
        return False

def login(driver):       
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

def create_poll(driver):
    # If using create poll as util, ensure user is already logged in before calling.
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