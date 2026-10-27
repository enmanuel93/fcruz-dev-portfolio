import emailjs from "@emailjs/browser";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { useLocale } from "@/i18n/useLocale";
import { locales } from "@/locales";
import { ContactForm } from "@/sections/contact/ContactForm";
import {
  MESSAGE_MIN_LENGTH,
  NAME_MIN_LENGTH,
} from "@/sections/contact/contactFormSchema";
import { MISSING_CONFIG_MESSAGE } from "@/sections/contact/useContactForm";

const { status } = locales.en.ui.contact;
const SUCCESS_MESSAGE = status.success;
const FALLBACK_ERROR_MESSAGE = status.failed;

// A stand-in for the navbar's switcher.
const SwitchToSpanish = (): ReactElement => {
  const { setLocale } = useLocale();
  return (
    <button type="button" onClick={() => setLocale("es")}>
      Español
    </button>
  );
};

vi.mock("@emailjs/browser", () => ({ default: { send: vi.fn() } }));

// Editable copy of the env config so a test can remove a value.
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

// No typing delay; with the default one, tests time out when the whole suite runs.
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
    // The hook logs send errors on purpose; hide them from the test output.
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    testConfig.serviceId = "service_test";
    localStorage.clear();
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

  it("sends trimmed values", async () => {
    sendMock.mockResolvedValue({ status: 200, text: "OK" });
    render(<ContactForm />);

    await user.type(screen.getByLabelText("Name"), "  Ada Lovelace  ");
    await user.type(screen.getByLabelText("Email"), " ada@example.com ");
    await user.type(screen.getByLabelText("Message"), "  Let's work together.  ");
    await user.click(screen.getByRole("button", { name: "Send Message" }));

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

  it("shows an error under every empty field and does not send", async () => {
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: "Send Message" }));

    expect(
      await screen.findByText(`Name must be at least ${NAME_MIN_LENGTH} characters.`),
    ).toBeInTheDocument();
    expect(screen.getByText("Please enter your email.")).toBeInTheDocument();
    expect(
      screen.getByText(`Message must be at least ${MESSAGE_MIN_LENGTH} characters.`),
    ).toBeInTheDocument();
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("links each invalid field to its error message", async () => {
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: "Send Message" }));

    const email = screen.getByLabelText("Email");
    await waitFor(() => expect(email).toHaveAttribute("aria-invalid", "true"));
    expect(email).toHaveAccessibleDescription("Please enter your email.");
    expect(screen.getByLabelText("Name")).toHaveFocus();
  });

  it("validates a field once it loses focus and clears the error when fixed", async () => {
    render(<ContactForm />);
    const email = screen.getByLabelText("Email");

    await user.type(email, "not-an-email");
    await user.tab();

    expect(
      await screen.findByText("Please enter a valid email address."),
    ).toBeInTheDocument();

    await user.clear(email);
    await user.type(email, "ada@example.com");

    await waitFor(() =>
      expect(
        screen.queryByText("Please enter a valid email address."),
      ).not.toBeInTheDocument(),
    );
    expect(email).not.toHaveAttribute("aria-invalid");
  });

  it("rejects a message that is too short", async () => {
    render(<ContactForm />);

    await user.type(screen.getByLabelText("Name"), "Ada Lovelace");
    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.type(screen.getByLabelText("Message"), "Hi");
    await user.click(screen.getByRole("button", { name: "Send Message" }));

    expect(
      await screen.findByText(
        `Message must be at least ${MESSAGE_MIN_LENGTH} characters.`,
      ),
    ).toBeInTheDocument();
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("shows its messages in the current language", async () => {
    sendMock.mockResolvedValue({ status: 200, text: "OK" });
    localStorage.setItem("locale", "es");
    render(
      <LocaleProvider>
        <ContactForm />
      </LocaleProvider>,
    );
    const es = locales.es.ui.contact;

    await user.click(screen.getByRole("button", { name: es.form.send }));
    expect(
      await screen.findByText(es.validation.nameTooShort(NAME_MIN_LENGTH)),
    ).toBeInTheDocument();
    expect(screen.getByText(es.validation.emailRequired)).toBeInTheDocument();

    await user.type(screen.getByLabelText(es.form.nameLabel), "Ada Lovelace");
    await user.type(screen.getByLabelText(es.form.emailLabel), "ada@example.com");
    await user.type(screen.getByLabelText(es.form.messageLabel), "Let's work together.");
    await user.click(screen.getByRole("button", { name: es.form.send }));

    expect(await screen.findByRole("status")).toHaveTextContent(es.status.success);
  });

  it("translates errors already on screen when the language changes", async () => {
    render(
      <LocaleProvider>
        <SwitchToSpanish />
        <ContactForm />
      </LocaleProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Send Message" }));
    expect(await screen.findByText("Please enter your email.")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Español" }));

    expect(
      screen.getByText(locales.es.ui.contact.validation.emailRequired),
    ).toBeInTheDocument();
    expect(screen.queryByText("Please enter your email.")).not.toBeInTheDocument();
  });

  it("does not call EmailJS when the configuration is incomplete", async () => {
    testConfig.serviceId = "";
    render(<ContactForm />);

    await fillAndSubmit();

    expect(sendMock).not.toHaveBeenCalled();
    // A plain Error has no `text`, so the generic message is shown.
    expect(await screen.findByRole("status")).toHaveTextContent(
      FALLBACK_ERROR_MESSAGE,
    );
    expect(console.error).toHaveBeenCalledWith(
      "EmailJS error:",
      new Error(MISSING_CONFIG_MESSAGE),
    );
  });
});
