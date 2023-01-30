# FDTD-website
FDTD simulation website. User can set air or metal in a two dimension field.


<img src="https://user-images.githubusercontent.com/34999008/215493816-5a02490c-796e-473f-94d2-dbaaa30feb12.gif"   width=600 height=300 >


# how to install

- Install apache server
  - set apache DocumentRoot to html2
  - install php

- make a jar file from FDTDVideo folder
  - use Intellij to make a jar file
  - the external library you need is inside the FDTDVideo project

# html2 folder commit
html2 is the DocumentRoot of apache

for security reasons, only html,css,php is in html2 folder

# html2_project commit
html2_project is where user's input text folder,output mp4,FDTDVideo.jar is stored.

#FDTDVideo commit

FDTDVideo is a java project Developed in Intellij.

Make a jar file form this project and place it in html2_project

External jar library that I have used is in FDTDVideo/libs directory

# External jar library
- slf4j-api-2.0.6.jar
- xuggle-xuggler-5.4.jar
