import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AnimatedSection from "@/components/AnimatedSection";

beforeAll(() => {
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof IntersectionObserver;
});

describe("AnimatedSection", () => {
  it("renders children", () => {
    render(
      <AnimatedSection>
        <div>Test Content</div>
      </AnimatedSection>
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <AnimatedSection className="custom-class">
        <div>Content</div>
      </AnimatedSection>
    );
    expect(screen.getByText("Content").parentElement).toHaveClass("custom-class");
  });
});
