import { fromWebDriverElement } from '../helpers/Element';

export async function command({ expression, args, options }: { expression: string; args: any[]; options: any }, callback: (result: any) => any) {
  try {
    if (options.noWait) callback({});

    if (options.frame) {
      options.context = options.context || {};
      options.context.frame = fromWebDriverElement(options.frame) as HTMLIFrameElement;
      expression = 'var window = this.frame.contentWindow; var document = this.frame.contentDocument;' + expression;
    }

    const result = await Function(expression).apply(options.context, args);
    if (!options.noWait) callback({ result });
  } catch (e) {
    const { name, message, stack } = e instanceof Error ? e : Error(JSON.stringify(e));
    callback({ error: { name, message, stack } });
  }
}
