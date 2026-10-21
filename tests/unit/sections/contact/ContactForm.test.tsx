import emailjs from "@emailjs/browser";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "@/sections/contact/ContactForm";
import {
  FALLBACK_ERROR_MESSAGE,
  MISSING_CONFIG_MESSAGE,
  SUCCESS_MESSAGE,
} from "@/sections/contact/useContactForm";

vi.mock("@emailjs/browser", () => ({ default: { send: vi.fn() } }));

// A mutable stand-in for the env config, so a test can blank out a value.
const testConfig = vi.hoisted(() => ({
  serviceId: "service_test",
  templateId: "template_test",
  publicKey: "public_test",
}));

vi.mock("@/config/env", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/config/env")>()),
  emailJsConfig: testConfig,
}));

const sendMock = vi.mocked(emailjs.send);

// No delay between keystrokes: the default timers make typing slow enough to
// time out when the whole suite runs in parallel.
const user = userEvent.setup({ delay: null });

const fillAndSubmit = async (): Promise<void> => {
  await user.type(screen.getByLabelText("Name"), "Ada Lovelace");
  await user.type(screen.getByLabelText("Email"), "ada@example.com");
  await user.type(screen.getByLabelText("Message"), "Let's work together.");
  await user.click(screen.getByRole("button", { name: "Send Message" }));
};

describe("ContactForm", () => {
  beforeEach(() => {
    sendMock.mockReset();
    // The hook logs failures on purpose; keep the test output clean.
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    testConfig.serviceId = "service_test";
  });

  it("sends the form fields through EmailJS with the configured keys", async () => {
    sendMock.mockResolvedValue({ status: 200, text: "OK" });
    render(<ContactForm />);

    await fillAndSubmit();

    expect(sendMock).toHaveBeenCalledWith(
      "service_test",
      "template_test",
      {
        from_name: "Ada Lovelace",
        from_email: "ada@example.com",
        message: "Let's work together.",
      },
      "public_test",
    );
  });

  it("confirms success and clears the form", async () => {
    sendMock.mockResolvedValue({ status: 200, text: "OK" });
    render(<ContactForm />);

    await fillAndSubmit();

    expect(await screen.findByRole("status")).toHaveTextContent(SUCCESS_MESSAGE);
    expect(screen.getByLabelText("Name")).toHaveValue("");
    expect(screen.getByLabelText("Email")).toHaveValue("");
    expect(screen.getByLabelText("Message")).toHaveValue("");
  });

  it("disables the button while the message is being sent", async () => {
    let finishSending!: () => void;
    sendMock.mockReturnValue(
      new Promise((resolve) => {
        finishSending = () => resolve({ status: 200, text: "OK" });
      }),
    );
    render(<ContactForm />);

    await fillAndSubmit();

    expect(screen.getByRole("button", { name: "Sending..." })).toBeDisabled();

    finishSending();
    expect(await screen.findByRole("button", { name: "Send Message" })).toBeEnabled();
  });

  it("shows the error text EmailJS returns and keeps what was typed", async () => {
    sendMock.mockRejectedValue({ status: 400, text: "The template ID is invalid" });
    render(<ContactForm />);

    await fillAndSubmit();

    expect(await screen.findByRole("status")).toHaveTextContent(
      "The template ID is invalid",
    );
    expect(screen.getByLabelText("Name")).toHaveValue("Ada Lovelace");
  });

  it("falls back to a generic message for unexpected errors", async () => {
    sendMock.mockRejectedValue(new Error("Network down"));
    render(<ContactForm />);

    await fillAndSubmit();

    expect(await screen.findByRole("status")).toHaveTextContent(
      FALLBACK_ERROR_MESSAGE,
    );
  });

  it("does not call EmailJS when the configuration is incomplete", async () => {
    testConfig.serviceId = "";
    render(<ContactForm />);

    await fillAndSubmit();

    expect(sendMock).not.toHaveBeenCalled();
    // The thrown Error has no `text`, so the visitor sees the generic message.
    expect(await screen.findByRole("status")).toHaveTextContent(
      FALLBACK_ERROR_MESSAGE,
    );
    expect(console.error).toHaveBeenCalledWith(
      "EmailJS error:",
      new Error(MISSING_CONFIG_MESSAGE),
    );
  });
});
