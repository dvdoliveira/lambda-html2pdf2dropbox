// The MIT License (MIT)
//
// Copyright (c) 2016 Deivide Oliveira
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

config = require('./config.js');
wkhtmltopdf = require('wkhtmltopdf');
uuid = require('node-uuid')
fs = require('fs');
dropbox = require('dropbox')


function createDropboxFile(fileName, fileStream) {
    var client = new dropbox.Client({
        key: config.dropbox.appKey,
        secret: config.dropbox.appSecret
    });
    var result = client.writeFile(fileName, fileStream, function (error, stat) {
        if (error) {
            console.log(error);
        }
    });
    return result;
}

// The handler will accept events in the following format
// {
//     "data" : "<h1>Hello World</h1>",
//     "filename": "optional filename",
//     "pagesize": "optional pagesize"
// }
exports.handler = function handler(event, context, callback) {
    if (!event.data) {
        console.log('Error: Unable to get the data');
        callback('Unable to get the data', {});
        return;
    }

    fileName = `${(event.filename || uuid.v4())}.pdf`;
    pageSize = event.pagesize || 'a4';
    data = event.data;
    output = `/tmp/${fileName}`;
    writeStream = fs.createWriteStream(output);

    var file = wkhtmltopdf(data, { pageSize: pageSize }).pipe(writeStream);
    createDropboxFile(fileName, file);
};
