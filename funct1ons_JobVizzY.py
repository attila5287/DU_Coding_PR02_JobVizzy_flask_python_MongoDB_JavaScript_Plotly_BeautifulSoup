import numpy as np
from splinter import Browser
import time
import pandas as pd
from bs4 import BeautifulSoup
import bs4
import requests


def compile_URL(job, city):
    """
    """
    base_url = 'http://www.indeed.com/jobs?q='
    add_1_job = job
    add_precity = '&l='
    add_2_city = city
    return (base_url + add_1_job + add_precity + add_2_city)


# print(compile_URL('developer','denver'))

def bring_soup(url):
    html_source = requests.get(url)
    soup = BeautifulSoup(html_source.content,
                         'html.parser', from_encoding="utf-8")
    return soup

# soup = bring_soup(compile_URL('developer','denver'))


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

# title_column(soup)


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

# location_column(soup)


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

# company_column(soup)


def desc_column(soup):
    col_desc = []
    for itersoup in soup.find_all(class_="result"):
        try:
            description = itersoup.find('span', {'class': 'summary'}).\
                text.replace('\n', '')
        except:
            description = 'None'
#             - - -
        col_desc.append(description.strip())
    return col_desc

# desc_column(soup)


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
    #     print('http://www.indeed.com'+href)


def frame_indeed(soup):
    """ this function still can not make soup """
    return pd.DataFrame({'Title': title_column(soup),
                         'Company': company_column(soup),
                         'Location': location_column(soup),
                         'Description': desc_column(soup),
                         'URLs': url_column(soup)})

# this is the main function of our app's JobLister module
# ====================================
# compile_URL('developer','denver')


def parse_n_frame(url):
    #     /*  this function brings soup herself  */
    soup = bring_soup(url)
    return pd.DataFrame({'Title': title_column(soup),
                         'Company': company_column(soup),
                         'Location': location_column(soup),
                         'Description': desc_column(soup),
                         'URLs': url_column(soup)})
# ============end==============

# ===========test==============
# parse_n_frame(dev_denver_url)


jobListSample = ['data+analyst',
                 'developer',
                 'programmer',
                 'front+end+developer',
                 'back+end+developer',
                 'full+stack+developer'
                 ]

cityListSample = ['denver',
                  'boulder',
                  'phoenix',
                  'houston',
                  'tucson',
                  'chicago',
                  'new+york',
                  'albuquerque',
                  'seattle',
                  'san+francisco'
                  ]


def scrapListFrame(job_list, city_list):
    pass
    list_of_all_frames = []
    for job in job_list:
        for city in city_list:
            __url__ = compile_URL(job, city)
            __df__ = parse_n_frame(__url__)
            __df__['cityJob'] = city
            __df__['cityJob'] = __df__['cityJob'].str.replace('+', ' ')
            list_of_all_frames.append(__df__)

    return pd.concat(list_of_all_frames)
# -----------------

# scrapListFrame(jobListSample,cityListSample)
# returns dataframe apprx 1,000 rows


# store above data consisting of concatanated dataframes
concat_df = scrapListFrame(jobListSample, cityListSample)

# len(concat_df)
# 992

# write scraped data to csv
file_output_csv01 = str(time.strftime("%m-%d-%y")) + \
    str(np.random.randint(1, 9+1)) + "-jobs.csv"
concat_df.to_csv("csv/" + file_output_csv01, encoding="utf-8")

concat_dict = concat_df.to_dict('records')
# converted a dataframe object to list of dicts for mongoDB
# db.insert_many(concat_df.to_dict('records'))

out_t0_JSON = concat_df.to_json(orient='records')[1:-1].replace('},{', '} {')
# type() returns STR

# run below to store JSON formatted data
# with open('file_name.json', 'w') as f:
#     f.write(out)

print(concat_df)
