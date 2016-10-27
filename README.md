# AWS Lambda - HTML to PDF to Dropbox

AWS Lambda function to convert HTML (or URLs) to PDF using Webkit (QtWebKit) and then upload the resulting file to Dropbox.

###  Prerequisites

* Node.js http://www.nodejs.org/
* Dropbox Developer key - https://www.dropbox.com/developers/core

## Setup

1. Get your Dropbox API keys(see link above)
2. Add the `appKey` and `appSecret` to the `config.js` file: 
```javascript
module.exports = {
  dropbox:{ appKey : "ADD YOUR OWN KEY",
            appSecret : "ADD YOUR OWN SECRET"},
};
```
3. Download the binary wkhtmltopdf for linux-x64 and put in the current directory
4. Run npm install

## Lambda Configuration

1. To submit the code to AWS Lambda just zip everything (including the `node_modules` directory) and upload the zip file

## Usage

### Input

```json
{
    "data" : "<h1>Hello World!</h1>",
    "filename": "optional filename",
    "pagesize": "optional pagesize"
}
```

### Output

```json
{
    "filename": "e16ba531-3f37-463b-b5b6-94bff2568de2.pdf"
}
```


## Useful Links

* http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html
* http://aws.amazon.com/documentation/apigateway/
* http://wkhtmltopdf.org/
* https://www.npmjs.com/package/wkhtmltopdf
* https://github.com/ashiina/lambda-local

## License

[The MIT License](http://opensource.org/licenses/MIT)
