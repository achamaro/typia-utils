import ja from "../public/message/ja.json";
import { message } from "./message";

describe("message", () => {
  const msg = message(ja);

  it("number (@type int)", () => {
    const error = {
      path: "",
      expected: "number (@type int)",
      value: null,
    };

    expect(msg(error)).toBe("整数値を入力してください。");
  });

  it("number (@type uint)", () => {
    const error = {
      path: "",
      expected: "number (@type uint)",
      value: null,
    };

    expect(msg(error)).toBe("正の整数値を入力してください。");
  });

  it("number (@minimum {number})", () => {
    const error = {
      path: "",
      expected: "number (@minimum 10)",
      value: null,
    };

    expect(msg(error)).toBe("10以上の値を入力してください。");
  });

  it("number (@maximum {number})", () => {
    const error = {
      path: "",
      expected: "number (@maximum 10)",
      value: null,
    };

    expect(msg(error)).toBe("10以下の値を入力してください。");
  });

  it("number (@exclusiveMinimum {number})", () => {
    const error = {
      path: "",
      expected: "number (@exclusiveMinimum 10)",
      value: null,
    };

    expect(msg(error)).toBe("10より大きい値を入力してください。");
  });

  it("number (@exclusiveMaximum {number})", () => {
    const error = {
      path: "",
      expected: "number (@exclusiveMaximum 10)",
      value: null,
    };

    expect(msg(error)).toBe("10より小さい値を入力してください。");
  });

  it("number (@multipleOf {number})", () => {
    const error = {
      path: "",
      expected: "number (@multipleOf 10)",
      value: null,
    };

    expect(msg(error)).toBe("10で割り切れる値を入力してください。");
  });

  it("string (@minLength {number})", () => {
    const error = {
      path: "",
      expected: "number (@minLength 10)",
      value: null,
    };

    expect(msg(error)).toBe("10文字以上で入力してください。");
  });

  it("string (@maxLength {number})", () => {
    const error = {
      path: "",
      expected: "number (@maxLength 10)",
      value: null,
    };

    expect(msg(error)).toBe("10文字以下で入力してください。");
  });

  it("string (pattern {regex})", () => {
    const error = {
      path: "",
      expected: "string (@pattern ^[a-z]+$)",
      value: null,
    };

    expect(msg(error)).toBe("正しい形式で入力してください。");
  });

  it("string (@format email)", () => {
    const error = {
      path: "",
      expected: "string (@format email)",
      value: null,
    };

    expect(msg(error)).toBe("メールアドレスを入力してください。");
  });

  it("string (@format uuid)", () => {
    const error = {
      path: "",
      expected: "string (@format uuid)",
      value: null,
    };

    expect(msg(error)).toBe("UUIDを入力してください。");
  });

  it("string (@format ipv4)", () => {
    const error = {
      path: "",
      expected: "string (@format ipv4)",
      value: null,
    };

    expect(msg(error)).toBe("IPv4形式で入力してください。");
  });

  it("string (@format ipv6)", () => {
    const error = {
      path: "",
      expected: "string (@format ipv6)",
      value: null,
    };

    expect(msg(error)).toBe("IPv6形式で入力してください。");
  });

  it("string (@format date)", () => {
    const error = {
      path: "",
      expected: "string (@format date)",
      value: null,
    };

    expect(msg(error)).toBe("日付を入力してください。");
  });

  it("string (@format date-time)", () => {
    const error = {
      path: "",
      expected: "string (@format date-time)",
      value: null,
    };

    expect(msg(error)).toBe("日時を入力してください。");
  });

  it("array (@minItems {number}", () => {
    const error = {
      path: "",
      expected: "array (@minItems 10)",
      value: null,
    };

    expect(msg(error)).toBe("10個以上入力してください。");
  });

  it("array (@minItems {number}", () => {
    const error = {
      path: "",
      expected: "array (@maxItems 10)",
      value: null,
    };

    expect(msg(error)).toBe("10個まで入力できます。");
  });
});
