import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectCard } from "@/sections/projects/ProjectCard";
import type { Project } from "@/types/content";

const project: Project = {
  title: "Weather App",
  description: "Forecasts for any city.",
  image: "/projects/weather.webp",
  tags: ["React", "TypeScript"],
  demoUrl: "https://weather.example.com",
  repoUrl: "https://github.com/example/weather",
};

describe("ProjectCard", () => {
  it("shows the project details and tags", () => {
    render(<ProjectCard project={project} />);

    expect(screen.getByRole("heading", { name: "Weather App" })).toBeInTheDocument();
    expect(screen.getByText("Forecasts for any city.")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Weather App" })).toHaveAttribute(
      "src",
      "/projects/weather.webp",
    );
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("labels the demo and source links so they make sense without the icons", () => {
    render(<ProjectCard project={project} />);

    expect(
      screen.getByRole("link", { name: "View Weather App live demo" }),
    ).toHaveAttribute("href", project.demoUrl);
    expect(
      screen.getByRole("link", { name: "View Weather App source code on GitHub" }),
    ).toHaveAttribute("href", project.repoUrl);
  });

  it("leaves out the links the project does not have", () => {
    render(
      <ProjectCard project={{ ...project, demoUrl: undefined, repoUrl: undefined }} />,
    );

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
