import { Command } from '@oclif/command';

export type InlinerCallback = (htmlDir: string, processedFile: string, inlinedHtml: string) => void;

export class Inliner {
  constructor(private cmd: Command, private callback: InlinerCallback) {}

  public async start(htmlDir: string): Promise<void> {
    this.cmd.log(`Inlining all html files in ${htmlDir}`);
  }
}
