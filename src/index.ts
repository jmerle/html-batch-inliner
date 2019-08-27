import { Command, flags } from '@oclif/command';
import * as fs from 'fs';
import * as path from 'path';
import { Inliner, InlinerCallback } from './Inliner';

class HtmlBatchInliner extends Command {
  public static description =
    'Quickly and easily inline all images, CSS stylesheets and JS scripts in all HTML files in a directory.';

  public static flags = {
    version: flags.version({
      char: 'v',
    }),

    help: flags.help({
      char: 'h',
    }),

    outDir: flags.string({
      char: 'o',
      description: 'The directory to write processed html files to',
    }),

    overwrite: flags.boolean({
      char: 'w',
      description: 'If specified, overwrite processed html files with their inlined version',
    }),
  };

  public static args = [
    {
      name: 'dir',
    },
  ];

  public static examples = ['path/to/html --outDir path/to/processed', 'path/to/html --overwrite'];

  public async run(): Promise<void> {
    const { args: parsedArgs, flags: parsedFlags } = this.parse(HtmlBatchInliner);

    const htmlDir = this.getHtmlDirectory(parsedArgs);
    const callback = this.getCallback(parsedFlags);

    const inliner = new Inliner(this, callback);
    await inliner.start(htmlDir);
  }

  private getHtmlDirectory(parsedArgs: { [p: string]: any }): string {
    const { dir } = parsedArgs;

    if (dir === undefined) {
      this.error('The dir argument is required.');
    }

    const absolutePath = path.resolve(process.cwd(), dir);

    if (!fs.existsSync(absolutePath)) {
      this.error('The specified directory is not a valid path to a directory.');
    }

    if (!fs.statSync(absolutePath).isDirectory()) {
      this.error('The specified directory is not a directory.');
    }

    return absolutePath;
  }

  private getCallback(parsedFlags: { [name: string]: any }): InlinerCallback {
    const { outDir, overwrite } = parsedFlags;

    if (outDir === undefined && overwrite === undefined) {
      this.error('One of --outDir or --overwrite should be set, not both.');
    }

    if (outDir !== undefined && overwrite !== undefined) {
      this.error('Either --outDir or --overwrite should be set, not both.');
    }

    if (outDir !== undefined) {
      return this.createOutDirCallback(outDir);
    }

    return this.createOverwriteCallback();
  }

  private createOutDirCallback(outDir: string): InlinerCallback {
    return (htmlDir, processedFile, inlinedHtml) => {
      //
    };
  }

  private createOverwriteCallback(): InlinerCallback {
    return (htmlDir, processedFile, inlinedHtml) => {
      fs.writeFileSync(processedFile, inlinedHtml);
    };
  }
}

export = HtmlBatchInliner;
