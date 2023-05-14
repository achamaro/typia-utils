import { IValidation } from "typia";

export type Messages = { [key: string]: string | Messages };
export type MessageDeriver = (error: IValidation.IError) => string | undefined;

const derivers = new Map<string, MessageDeriver>();

export function setDeriver(locale: string, deriver: MessageDeriver): void {
  derivers.set(locale, deriver);
}

export function getDeriver(locale?: string): MessageDeriver {
  // 指定のロケール、または先頭のロケール
  const deriver = derivers.get(locale ?? "") ?? derivers.values().next().value;
  if (!deriver) {
    throw new Error(`Message deriver not found`);
  }

  return deriver;
}

export function createDeriver(messages: Messages): MessageDeriver {
  return (error: IValidation.IError) => {
    const { expected, value } = error;

    // string (@format email)
    const [type, ...tagText] = expected.split(" ");
    const [tag, ...args] = tagText.join(" ").slice(2, -1).split(" ");
    const arg = args.join(" ");

    // tag.type.arg
    // tag.arg
    // tag.type
    // tag
    // type
    let msg: string | undefined = undefined;
    if (isString(messages[tag])) {
      msg = messages[tag] as string;
    } else if (isString(messages[type])) {
      msg = messages[type] as string;
    } else if (isString((messages[tag] as Messages)?.[arg])) {
      msg = (messages[tag] as Messages)[arg] as string;
    } else if (isString((messages[tag] as Messages)?.[type])) {
      msg = (messages[tag] as Messages)[type] as string;
    } else {
      ((messages[tag] as Messages)?.[type] as Messages)?.[arg] as
        | string
        | undefined;
    }

    if (msg && !isString(msg)) {
      throw new Error(`Message must be string: ${JSON.stringify(msg)}`);
    }

    if (msg && arg != null) {
      const args = [arg];
      msg = msg
        .replaceAll(/{\d+}/g, (_, index) => {
          return args[index] ?? "";
        })
        .replace("{value}", value);
    }

    return msg;
  };
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}
