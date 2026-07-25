import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";
import { LangProvider } from "@/lib/lang-context";

jest.mock("@/lib/profile", () => ({
  getProfile: jest.fn(() => Promise.resolve(null)),
}));

const renderWithLang = (component: React.ReactNode) => {
  return render(<LangProvider>{component}</LangProvider>);
};

describe("Footer", () => {
  it("renders copyright text", () => {
    renderWithLang(<Footer />);
    expect(screen.getByText(/Tous droits reserves/)).toBeInTheDocument();
  });

  it("renders current year", () => {
    renderWithLang(<Footer />);
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
  });
});
