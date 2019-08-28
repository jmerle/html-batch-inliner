# HTML Batch Inliner

A CLI to quickly and easily inline all images, CSS stylesheets and JS scripts in all HTML files in a directory.

[![Oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Build Status](https://dev.azure.com/jmerle/html-batch-inliner/_apis/build/status/Build?branchName=master)](https://dev.azure.com/jmerle/html-batch-inliner/_build/latest?definitionId=3&branchName=master)
[![Codecov](https://codecov.io/gh/jmerle/html-batch-inliner/branch/master/graph/badge.svg)](https://codecov.io/gh/jmerle/html-batch-inliner)
[![Version](https://img.shields.io/npm/v/html-batch-inliner.svg)](https://npmjs.org/package/html-batch-inliner)
[![License](https://img.shields.io/npm/l/html-batch-inliner.svg)](https://github.com/jmerle/html-batch-inliner/blob/master/package.json)

## Install

```
$ npm install --global html-batch-inliner
# or
$ yarn global add html-batch-inliner
```

## Usage

```sh
Quickly and easily inline all images, CSS stylesheets and JS scripts in all HTML files in a directory.

USAGE
  $ html-batch-inliner [DIR]

OPTIONS
  -h, --help           show CLI help
  -o, --outDir=outDir  The directory to write processed html files to
  -v, --version        show CLI version
  -w, --overwrite      If specified, overwrite processed html files with their inlined version

EXAMPLES
  path/to/html --outDir path/to/processed
  path/to/html --overwrite
```

One of the `--outDir` or `--overwrite` flags is required. Running without either of them or with both will result in an error.
