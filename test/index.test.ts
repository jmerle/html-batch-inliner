import { LoadOptions } from '@oclif/config';
import { expect, test } from '@oclif/test';
import * as path from 'path';
import cmd = require('../src');

const validHtmlDir = path.resolve(__dirname, '../src');

function t(argv?: string[], config?: LoadOptions): typeof test {
  return test.stdout().do(() => cmd.run(argv));
}

describe('html-batch-inliner', () => {
  describe('arguments', () => {
    t(['--overwrite'])
      .exit(2)
      .it('errors if html directory is not given');

    t(['some/random/path', '--overwrite'])
      .exit(2)
      .it('errors if html directory is not a valid path');

    t([path.resolve(__dirname, '../package.json'), '--overwrite'])
      .exit(2)
      .it('errors if html directory is not a directory');

    t([validHtmlDir, '--overwrite']).it('does not error if html directory is valid', ctx => {
      expect(ctx.error).to.be.undefined;
    });
  });

  describe('flags', () => {
    t([validHtmlDir])
      .exit(2)
      .it('errors if no flags are given');

    t([validHtmlDir, '--outDir', 'path/to/inlined', '--overwrite'])
      .exit(2)
      .it('errors if both --outDir and --overwrite flags are given');

    t([validHtmlDir, '--outDir', 'path/to/inlined']).it('does not error if only the --outDir flag is given', ctx => {
      expect(ctx.error).to.be.undefined;
    });

    t([validHtmlDir, '--overwrite']).it('does not error if only the --overwrite flag is given', ctx => {
      expect(ctx.error).to.be.undefined;
    });
  });
});
