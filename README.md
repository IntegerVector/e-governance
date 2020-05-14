# E-Governance

E-governance is a simple client - server tool for providing web acces to some services of specific organization.
As example, this application provide access to imaginary university deanery services.

### Tech
Project consists of [`mySQL`](https://www.mysql.com/) data base, server based on [`express`](https://expressjs.com/) , and clien web application based on [`Angular`](https://angular.io/).
Uses [Typescrip](https://www.typescriptlang.org/) as main development language.
Also used packages:
* [lodash](https://lodash.com/)
* [mysql](https://github.com/mysqljs/mysql#readme)
* [utf8](https://github.com/mathiasbynens/utf8.js)
* [base-64](https://github.com/mathiasbynens/base64)
* [rxjs](https://github.com/ReactiveX/RxJS)
* [bootstrap](https://getbootstrap.com/docs/3.4/css/)

### Installation

Project requires [Node.js](https://nodejs.org/) v12.16.3+ to run (actually may be working on lover versions, but not tested)
and [MySql](https://www.mysql.com/) database v8.0.20.

Before building project you should create database using `database/DB.sql` file:
- Create password and add it to the
`CREATE USER 'eg-user'@'localhost' IDENTIFIED WITH mysql_native_password BY '';`
string of the `database/DB.sql` file instead of empty brakets
(e.g. `CREATE USER 'eg-user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'my_strong_password_!';`);
- Add the same password into `server/conf.json` file in `"sqlPass"` field
e.g. {
    "port": 8080,
    "withAdmins": true,
    "sqlLogin": "eg-user",
    "sqlPass": "my_strong_password_!",
    "dataBase": "egovernance"
};
- Import `database/DB.sql` to your mysql database;

Also add server certificate and private key paths to `server/conf.json` file
```js
{
    "port": 8080,
    "withSSL": true, // or change it to `false`, and server will run with plain HTTP
    "certPath": "path/to/certificate/server.cert",
    "keyPath" : "path/to/key/server.key",
    "sqlLogin": "eg-user",
    "sqlPass": "my_strong_password_!",
    "dataBase": "egovernance"
}

```

Install the dependencies and devDependencies and build server with frontend application.

```sh
$ cd server
$ npm install -d
$ npm run build
$ npm run serve
$ cd ..
$ cd app
$ npm install -d
$ npm run build
```

Open browser on [https://localhost:8080](https://localhost:8080) or [http://localhost:8080](http://localhost:8080) for starting web application.

### Lisence
Apache License 2.0
