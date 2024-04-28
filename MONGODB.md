# MongoDB Operations

```bash
# install mongoDB

# Install mongosh

# get connection string
db.getMongo()

mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.4
'mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]'
'mongodb://myDatabaseUser:D1fficultP%40ssw0rd@db0.example.com,db1.example.com,db2.example.com/?replicaSet=myRepl&tls=true'
'mongodb://myDatabaseUser:D1fficultP%40ssw0rd@db0.example.com,db1.example.com,db2.example.com/?replicaSet=myRepl&ssl=true'

# create user Administrator
# switch to admin DB

use admin
db.createUser(
  {
    user: "useradmin",
    pwd: "useradmin",
    roles: [
      { role: "userAdminAnyDatabase", db: "admin" },
      { role: "readWriteAnyDatabase", db: "admin" }
    ]
  }
)
# response should be 
{ ok: 1 }
# Shutdown it 
db.adminCommand( { shutdown: 1 } )


# create database
# created using UI App MongoDB Compass

mongosh nextdemo

# or
mongosh
use nextdemo

use test
db.createUser(
  {
    user: "admin",
    pwd:  passwordPrompt(),   // or cleartext password
    roles: [ { role: "readWrite", db: "test" },
             { role: "read", db: "reporting" } ]
  }
)

db.createUser(
  {
    user: "admin",
    pwd:  "adminPassword",
    roles: [ { role: "readWrite", db: "nextdemo" },
             { role: "read", db: "test" } ]
  }
)
# Change mongod Configuration to use authentication

security:
  authorization: enabled

# Now the file will look like this

systemLog:
  destination: file
  path: /opt/homebrew/var/log/mongodb/mongo.log
  logAppend: true
storage:
  dbPath: /opt/homebrew/var/mongodb
net:
  bindIp: 127.0.0.1, ::1
  ipv6: true
security:
  authorization: enabled

#  restart the MongoDB
brew services restart mongodb-community

Stopping `mongodb-community`... (might take a while)
==> Successfully stopped `mongodb-community` (label: homebrew.mxcl.mongodb-community)
==> Successfully started `mongodb-community` (label: homebrew.mxcl.mongodb-community)


# Connect with mongosh with auth
mongosh --port 27017 --authenticationDatabase "admin" -u "useradmin" -p

# Reference error from Nextjs App
 ⨯ ReferenceError: E is not defined

 
# Show databases
use admin
show databases

use nextdemo
show databases
show tables
show collections
```