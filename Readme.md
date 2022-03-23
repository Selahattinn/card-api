# Card API

## Pre Reqs
. Mysql

. Cards isimli bir database

. Db'de password var ise app/config/db.config.js altından ayarlanması


## Projedeki endpointler
Login dışındaki bütün endpointlerde jwt kontrolu vardır. Eğer token valid değil veya expired olmuşsa 401 döner

### Login

/api/v1/auth/login (POST)

static bir username:password kontrolü vardır.

Username:jhon
Password:12345

### Get ALL Cards

/api/v1/card (GET)

### Create a Card

/api/v1/card (POST)

### Update a Card

/api/v1/card/:id (PUT)

### Delete a Card

/api/v1/card/:id (DELETE)

### Delete all Cards

/api/v1/card (DELETE)



## Eksikler

Bir jwt kontrolü var ama user identifier olarak body içerisindeki username kullanılmakta. Bu sağlıklı bir kullanım değil ve kullanıcı burayı değiştirerek db'de işlem yapabilir. 

Bunu fixlemek için jwt'inin claimslere göre parse edilip içinden username değerine göre db'de query çalıştırılmalı.

Log middleware eklense fena olmaz.

Bazı datalar kodda static. Bunların generic olup bir config file'dan okuması lazım.(serverIP/serverPort/JWT Signing key)

Tests  :))))


## For run:
node server.js

localhost:8080'de ayağa kalkıyor

## JWT Secret
secret
