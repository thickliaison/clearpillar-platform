# Project Structure
The code is currently separated into 2 folders: ``client`` and ``server``. All frontend client-side code sits in the ``client`` folder while the backend server-side code sits in the ``server`` folder.

### Client-side Technologies
- React.js
- CRA

### Server-side Technologies
- Express.js
- PostgreSQL (AWS Lightsail database)
- AWS bucket (AWS Lightsail storage)

<br/>

# Info
This website was created using CRA (Create React App). It may need be build from CRV (Create React Vite), because Content Security Policy needs to be set; there cannot be any iframe of the website for security purposes.

Currently, there is no database or bucket hosted by AWS Lightsail, since it was decided that the public-facing website would not have the login system (which is in progress). As this project is passed down to other developers under Thick Liaison, it is up to you that you set up the database and bucket in AWS Lightsail and correctly configure it in the code (.env file). You also need to make sure you have the .pem file, which is the AWS certificate SSL connection to the database.

If you change the PORT number for the server-side, please make sure you also change the ProxyPass and ProxyPassReverse on AWS Lightsail (VirtualHost) using the browser SSH terminal (or on your own device. Up to you.):
```
vi /opt/bitnami/apache/conf/vhosts/myapp-http-vhost.conf
i

  <VirtualHost _default_:80>
    ServerAlias *
    DocumentRoot "/home/binami/htdocs/clearpillar-platform/server"
    <Directory "/home/binami/htdocs/clearpillar-platform/server">
      Require all granted
    </Directory>
    ProxyPass / http://localhost:3001/
    ProxyPassReverse / http://localhost:3001/
  </VirtualHost>
[ESC key]
:x!
```

```
vi /opt/bitnami/apache/conf/vhosts/myapp-https-vhost.conf
i

  <VirtualHost _default_:443>
    ServerAlias *
    SSLEngine on
    SSLCertificateFile "/opt/bitnami/apache/conf/bitnami/certs/server.crt"
    SSLCertificateKeyFile "/opt/bitnami/apache/conf/bitnami/certs/server.key"
    DocumentRoot "/home/binami/htdocs/clearpillar-platform/server"
    <Directory "/home/binami/htdocs/clearpillar-platform/server">
      Require all granted
    </Directory>
    ProxyPass / http://localhost:3001/
    ProxyPassReverse / http://localhost:3001/
  </VirtualHost>
[ESC key]  
:x!
```

The SSL certificate is issued using certbot. If you get a 526 error when trying to reach the website, check the current certificates: 

``sudo certbot certificates``

<br/>
The SSL certificate should be auto-renewed by default. If for whatever reason it isn't, issue a new one: 

``sudo certbot certonly --webroot -w /opt/bitnami/apache/htdocs -d clearpillar.us -d www.clearpillar.us``

*Note: Check that htdocs/.well-known/acme-challenge exists (use the cd command-- the directory may not show in the terminal.) The certificate needs to be installed here so that the application can use/reach this. Look at server/app.js*

<br/>
To test auto renew of SSL certificate: ``sudo certbot renew --dry-run``

<br/>

Apache can be restarted using: ``sudo /opt/bitnami/ctlscript.sh restart apache``

<br/>

# How to Deploy
To push the code to production, AWS Lightsail uses the domain as the server (it has been configured that way--http://localhost:3001 is proxied). This means that you **must replace** ALL http://localhost:3001 with https://clearpillar.us in the client-side files axios requests. Failure to do so will result in a 503 error.

*Note: This method is consistently removing and pushing new code. There must be another way that is easier or less time-consuming. Maybe a script. Or using FileZilla. Something like that. Could probably try doing git fetch/pull.*

*Also, it's important that any **current processes are killed** before trying to use ``sudo rm -rf`` or you face a headache trying to fix it.*

### Deployment Procedure Commands:
``cd htdocs``

``pm2 list``

``pm2 stop 0``

``pm2 delete 0``

``sudo rm -rf clearpillar-platform``

``git clone -b production https://github.com/thickliaison/clearpillar-platform.git``

``[use your Github username]``

``[use your PAF]``

``cd clearpillar-platform``

``cd client``

``npm install``

``npm run build``

``cd ../server``

``npm install``

``sudo nano .env``

``[add all the .env variables/key-value pairs]``

``pm2 start --name server.js npm -- run start-server``
