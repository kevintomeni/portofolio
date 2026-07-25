import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { LangProvider } from "@/lib/lang-context";

jest.mock("@/lib/firebase", () => ({
  getDb: jest.fn(() => ({})),
  getAuthInstance: jest.fn(() => ({})),
  getStorageInstance: jest.fn(() => ({})),
}));

jest.mock("@/lib/projects", () => ({
  getProjects: jest.fn(() => Promise.resolve([])),
}));

jest.mock("@/lib/profile", () => ({
  getProfile: jest.fn(() => Promise.resolve(null)),
}));

jest.mock("@/lib/auth-context", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
  useAuth: () => ({ user: null, loading: false, login: jest.fn(), logout: jest.fn() }),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt="" {...(props as React.ImgHTMLAttributes<HTMLImageElement>)} />;
  },
}));

beforeAll(() => {
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof IntersectionObserver;
});

import ProjectsSection from "@/components/ProjectsSection";

const renderWithLang = (component: React.ReactNode) => {
  return render(<LangProvider>{component}</LangProvider>);
};

describe("ProjectsSection", () => {
  it("renders section title", async () => {
    renderWithLang(<ProjectsSection />);
    expect(await screen.findByText("Projets Recents")).toBeInTheDocument();
  });

  it("renders category filters", async () => {
    renderWithLang(<ProjectsSection />);
    expect(await screen.findByText("Tous")).toBeInTheDocument();
  });
});
