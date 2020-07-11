const fs = require('fs');
const domain = require('domain').create();
const async = require('async');

const charset = 'utf-8';
const dataJSON = { file: {}, fileArray: [], error: {} };

const cap3Index = (req, res) => {
  console.log('index do cap3');
  res.render('cap3/index', dataJSON);
};

const cap3FileReader = (req, res) => {
  const file = './src/public/fileExample.txt';

  fs.readFile(file, charset, (err, data) => {
    if (err) {
      throw err;
    }
    console.log(data);
    res.render('cap3/index', { ...dataJSON, file: { data } });
  });

  console.log('Lendo o arquivo...');
};

const cap3Domains = function (req, res) {
  const file = './src/public/fileExample.txt';
  fs.readFile(
    file,
    charset,
    domain.intercept((data) => {
      console.log(data);
      res.render('cap3/index', { ...dataJSON, file: { data } });
    })
  );

  console.log('lendo o arquivo...');

  domain.on('error', (error) => {
    console.log('Sem arquivos para ler my friend...');
  });
};

const cap3AsyncSeries = (req, res) => {
  const file1 = './src/public/fileExample.txt';
  const file2 = './src/public/file2.txt';
  const file3 = ''; //"./src/public/file3.txt";
  let array = [];
  async.series(
    [
      function (callback) {
        fs.readFile(file1, charset, (err, data) => {
          callback(err, data);
        });
      },
      function (callback) {
        fs.readFile(file2, charset, (err, data) => {
          callback(err, data);
        });
      },
      function (callback) {
        fs.readFile(file3, charset, (err, data) => {
          callback(err, data);
        });
      },
    ],
    (error, results) => {
      error && console.log('DEU RUIM! ', error.toString());
      results &&
        results.forEach((item) => {
          array.push(item);
        });

      res.render('cap3/index', { ...dataJSON, fileArray: array });
    }
  );
};

const cap3AsyncParallel = (req, res) => {
  const file1 = './src/public/fileExample.txt';
  const file2 = './src/public/file2.txt';
  const file3 = './src/public/file3.txt';
  let array = [];
  console.log('async parallel');
  async.parallel(
    {
      one: function (callback2) {
        console.log('callback 1');
        fs.readFile(file1, charset, (err, data) => {
          callback2(err, data);
        });
      },
      two: function (callback2) {
        console.log('callback 2');
        fs.readFile(file2, charset, (err, data) => {
          callback2(err, data);
        });
      },
      three: function (callback2) {
        console.log('callback 3');
        fs.readFile(file3, charset, (err, data) => {
          callback2(err, data);
        });
      },
    },
    function (error, results) {
      console.log('encerrando async parallel...');
      let response = { ...dataJSON };
      if (error) {
        response = { ...dataJSON, error: error.toString() };
      } else {
        results &&
          Object.values(results).forEach((item) => {
            array.push(item);
          });
        if (array) {
          response = { ...response, fileArray: array };
        }
        console.log('response: ', response);
      }
      res.render('cap3/index', response);
    }
  );
};

module.exports = {
  cap3Index,
  cap3FileReader,
  cap3Domains,
  cap3AsyncSeries,
  cap3AsyncParallel,
};
