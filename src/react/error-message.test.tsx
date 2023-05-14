import "@testing-library/jest-dom";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach } from "vitest";

import en from "../../public/message/en.json";
import ja from "../../public/message/ja.json";
import { message } from "..";
import { ErrorMessage, messages } from "./error-message";

afterEach(cleanup);

describe("error-message", () => {
  messages.set("ja", message(ja));
  messages.set("en", message(en));

  it("ja", () => {
    const error = {
      path: "",
      expected: "number (@type int)",
      value: null,
    };

    render(<ErrorMessage error={error} locale="ja" />);
    expect(screen.getByText("整数値を入力してください。")).toBeInTheDocument();
  });

  it("en", () => {
    const error = {
      path: "",
      expected: "number (@type int)",
      value: null,
    };

    render(<ErrorMessage error={error} locale="en" />);
    expect(
      screen.getByText("Please enter an integer value.")
    ).toBeInTheDocument();
  });

  it("fallback locale", () => {
    const error = {
      path: "",
      expected: "number (@type int)",
      value: null,
    };

    render(<ErrorMessage error={error} />);
    expect(screen.getByText("整数値を入力してください。")).toBeInTheDocument();
  });
});
