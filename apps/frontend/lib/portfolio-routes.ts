// Single source of truth for page order — was previously duplicated as a
// local ORDER array in both PageNav.tsx and PageTransition.tsx.
export const portfolioRoutes = [
  { id: "home", href: "/" },
  { id: "about", href: "/about" },
  { id: "skills", href: "/skills" },
  { id: "projects", href: "/projects" },
  { id: "certificates", href: "/certificates" },
  { id: "contact", href: "/contact" }
] as const;

export const ROUTE_ORDER = portfolioRoutes.map((route) => route.href);

export function getAdjacentRoutes(pathname: string) {
  const index = ROUTE_ORDER.indexOf(pathname as (typeof ROUTE_ORDER)[number]);
  return {
    index,
    prevHref: index > 0 ? ROUTE_ORDER[index - 1] : null,
    nextHref: index >= 0 && index < ROUTE_ORDER.length - 1 ? ROUTE_ORDER[index + 1] : null
  };
}
