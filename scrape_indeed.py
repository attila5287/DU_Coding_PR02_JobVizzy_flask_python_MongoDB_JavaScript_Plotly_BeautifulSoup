from tabulate import tabulate
import time
import pandas as pd
from bs4 import BeautifulSoup
import bs4
import requests
from IPython.core.interactiveshell import InteractiveShell
InteractiveShell.ast_node_interactivity = "all"
# ============================================
# ============================================


# ============================================
# ============================================
def compile_URL(job, city):
    base_url = 'http://www.indeed.com/jobs?q='
    add_1_job = job
    add_precity = '&l='
    add_2_city = city
    return (base_url + add_1_job + add_precity + add_2_city)


def bring_soup(url):
    html_source = requests.get(url)
    soup = BeautifulSoup(html_source.content,
                         'html.parser', from_encoding="utf-8")
    return soup


def title_column(soup):
    col_title = []
    for itersoup in soup.find_all(class_="result"):
        # - - - -
        try:
            itertitle = itersoup.find(class_='jobtitle').\
                text.replace('\n', '')
        except:
            itertitle = 'None'
        # - - - -
        col_title.append(itertitle)

    return col_title


def location_column(soup):
    col_location = []
    for itersoup in soup.find_all(class_="result"):
        try:
            location = itersoup.find('span', {'class': "location"}).\
                text.replace('\n', '')
        except:
            location = 'None'
#             - - -
        col_location.append(location)
    return col_location


def company_column(soup):
    col_company = []
    for itersoup in soup.find_all(class_="result"):
        try:
            company = itersoup.find(class_='company').\
                text.replace('\n', '')
        except:
            company = 'None'
#             - - -
        col_company.append(company.strip())
    return col_company


def desc_column(soup):
    col_desc = []
    for itersoup in soup.find_all(class_="result"):
        try:
            description = itersoup.find(
                'span', {'class': 'summary'}).text.replace('\n', '')

        except:
            description = 'None'
#             - - -
        col_desc.append(description.strip())
    return col_desc


def url_column(soup):
    col_href = []
    base_url = 'http://www.indeed.com'
    for iterfoo in soup.find_all(class_="result"):
        try:
            href = iterfoo.find('a')['href']
            col_href.append((base_url+href).strip())
        except:
            href = 'None'
            col_href.append(href)

    return list(col_href)


def frame_indeed(soup):
    return pd.DataFrame({'Title': title_column(soup),
                         'Company': company_column(soup),
                         'Location': location_column(soup),
                         'Description': desc_column(soup),
                         'URLs': url_column(soup)
                         })


def parse_n_frame(url):
    soup = bring_soup(url)
    return pd.DataFrame({'Title': title_column(soup),
                         'Company': company_column(soup),
                         'Location': location_column(soup),
                         #  'Description': desc_column(soup),
                         #  'URLs': url_column(soup)
                         }).to_html()


# the end #
def parse_frame_html(url):
    soup = bring_soup(url)
    return pd.DataFrame({'Title': title_column(soup),
                         'Company': company_column(soup),
                         'Location': location_column(soup),
                         #  'Description': desc_column(soup),
                         #  'URLs': url_column(soup)
                         }).to_html()


# print(parse_frame_html(compile_URL('developer', 'denver')))

def parse_dict_mongodb(url):
    pass
    dict_soup = {}
    bring_soup(url)
    # ----
    # for job inr

    return
