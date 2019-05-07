To run automated browser tests using selenium and python

1. Install the following
    Selenium Standalone Server @ https://www.seleniumhq.org/download/
    Python @ 3.7.1
    Selenium python package via pip install selenium
    Google Chrome web driver version 74 @ http://chromedriver.chromium.org/downloads

2. Make sure that the chrome driver binary is located in your system path

3. Run individual tests via command line with python
    ex. python tests_login.py
    To run a specific test in a module, run python -m tests_login LogInTests.test_login_successful for example

To run Karma unit tests type 'ng test' in the command line inside the root directory of the project.
You must have all dependencies listed in main readme to execute angular cli commands.

