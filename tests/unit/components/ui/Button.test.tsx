import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders a link when given an href", () => {
    render(<Button href="#contact">Contact Me</Button>);

    expect(screen.getByRole("link", { name: "Contact Me" })).toHaveAttribute(
      "href",
      "#contact",
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("protects the opener when a link opens in a new tab", () => {
    render(
      <Button href="https://github.com/" target="_blank" variant="outline">
        View All Projects
      </Button>,
    );

    const link = screen.getByRole("link", { name: "View All Projects" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("does not add rel to links that open in the same tab", () => {
    render(<Button href="/documents/cv.pdf" download>Download CV</Button>);

    const link = screen.getByRole("link", { name: "Download CV" });
    expect(link).toHaveAttribute("download");
    expect(link).not.toHaveAttribute("rel");
  });

  it("renders a client-side route link when given a to", () => {
    render(
      <MemoryRouter>
        <Button to="/contact">Contact Me</Button>
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "Contact Me" })).toHaveAttribute(
      "href",
      "/contact",
    );
  });

  it("renders a native button that does not submit forms by default", () => {
    render(<Button>Save</Button>);

    expect(screen.getByRole("button", { name: "Save" })).toHaveAttribute(
      "type",
      "button",
    );
  });

  it("passes the submit type through", () => {
    render(<Button type="submit">Send</Button>);

    expect(screen.getByRole("button", { name: "Send" })).toHaveAttribute(
      "type",
      "submit",
    );
  });

  it("calls onClick when clicked", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    await userEvent.click(screen.getByRole("button", { name: "Click" }));

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("does not call onClick while disabled", async () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Click
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Click" });
    await userEvent.click(button);

    expect(button).toBeDisabled();
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("lets a custom className override the size padding", () => {
    render(
      <Button size="lg" className="px-2">
        Wide
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Wide" });
    expect(button).toHaveClass("px-2");
    expect(button).not.toHaveClass("px-6");
  });
});
