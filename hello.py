import pymongo
import sys
import pandas as pd
import numpy as np
from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.miniproject
collection = db.entries
# print(collection);

data = pd.DataFrame(list(collection.find()))

df=data[['total_sqft','bath','balcony','price','bhk']]
X = df.drop(['price'],axis='columns')


Y = df.price
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X,Y,test_size=0.2,random_state=10)


from sklearn.linear_model import LinearRegression
lr_clf = LinearRegression()
y_train=pd.DataFrame(y_train)
x_train=pd.DataFrame(X_train)

lr_clf.fit(X_train,y_train)

x = np.zeros(len(X.columns))
x[0] = sys.argv[1]
x[1] = sys.argv[2]
x[2] = sys.argv[3]
x[3] = sys.argv[4]

print(round(lr_clf.predict([x])[0][0],2))

