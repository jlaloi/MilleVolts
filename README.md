TEST 1
======

Check directory /test1

**Start the server**  
exec: _docker-compose up_  
_Default listening port is 9090_  

**Create Companies**  
POST to _/api/company  
{"name": "World Company","mail": "master@worldcompany.com"}_  
then  
_{"name": "E. Corp","mail": "master@ecorp.com"}_  

**Create Opportunities**  
POST to _/api/opportunity  
{  
    "title": "Developeur Backend",  
    "description": "Node, Mongo",  
    "company": &lt;World Company ID&gt;,  
    "region": &lt;Enum ID&gt;,  
    "city": "Rennes",  
    "contractType": &lt;Enum ID&gt;  
}_  
then  
_{  
    "title": "Developeur FrontEnd",   
    "description":" React, HTML5, CSS3",  
    "company": &lt;E. Corp&gt; ID,  
    "region": &lt;Enum ID&gt;,  
    "city": "Paris",  
    "contractType": &lt;Enum ID&gt;  
}_

**Get opportunities**  
GET to _/api/opportunity_  
GET to _/api/opportunity/search?query=Developeur_  
GET to _/api/opportunity/search?query=Developeur&amp;region=&lt;Enum ID&gt; _  
GET to _/api/opportunity/search?query=Developeur&amp;region=&lt;Enum ID&gt;&amp;contractType=&lt;Enum ID&gt;_  
GET to _/api/opportunity/&lt;Opportunity ID&gt;_  

**Apply to opportunity**  
POST to _/api/application  
{  
    "firstName": "Elliot",  
    "lastName": "Alderson",  
    "mail": "Elliot.Alderson@AllsafeSecurity.com",  
    "message": "Hello!",  
    "opportunity": &lt;Opportunity ID&gt;  
}  
{  
    "firstName": "Edward",  
    "lastName": "Alderson",  
    "mail": "mr.robot@fsociety.com",  
    "message": "Hi!",  
    "opportunity": &lt;Opportunity ID&gt;  
}_  

**Get companies**  
GET to _/api/company_  

**Get companies opportunities**  
GET to _/api/company/&lt;Company Id&gt;/opportunities_  

**Get opportunity applications**  
GET to _/api/opportunity/&lt;Opportunity ID&gt;/applications_  

TEST 2
======

Check source test2.js

TEST 3
======

Check source test3.html

TEST 4
======

Check source test4.html
