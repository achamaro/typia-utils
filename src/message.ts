import { IValidation } from "typia";

export type Messages = { [key: string]: string | Messages };
export type MessageFunc = (error: IValidation.IError) => string | undefined;

export function message(messages: Messages): MessageFunc {
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
