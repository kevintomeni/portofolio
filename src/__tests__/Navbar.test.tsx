import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Navbar from "@/components/Navbar";
import { LangProvider } from "@/lib/lang-context";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

const renderWithLang = (component: React.ReactNode) => {
  return render(<LangProvider>{component}</LangProvider>);
};

describe("Navbar", () => {
  it("renders the portfolio logo", () => {
    renderWithLang(<Navbar />);
    expect(screen.getByText("Portfolio")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    renderWithLang(<Navbar />);
    expect(screen.getByText("Competences")).toBeInTheDocument();
    expect(screen.getByText("Projets")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders language toggle button", () => {
    renderWithLang(<Navbar />);
    expect(screen.getByText("fr", { selector: ".uppercase" })).toBeInTheDocument();
  });
});
