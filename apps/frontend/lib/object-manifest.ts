export type MotionKind =
  | "floatSlow"
  | "floatMedium"
  | "floatFast"
  | "orbitLeft"
  | "orbitRight"
  | "rotateSlow"
  | "tiltLeft"
  | "tiltRight";

export type ObjectPart = {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  z: number;
  motion: MotionKind;
};

export type ObjectFamily = {
  page: string;
  fallback: string;
  parts: ObjectPart[];
};

export const OBJECT_MANIFEST: Record<string, ObjectFamily> = {
  backend: {
    page: "about",
    fallback: "/objects/backend/full/backend-full.png",
    parts: [
      { id: "core", src: "/objects/backend/parts/central-python-core.png", x: 50, y: 49, width: 31, z: 30, motion: "floatSlow" },
      { id: "djangoLeft", src: "/objects/backend/parts/django-left-node.png", x: 29, y: 24, width: 18, z: 20, motion: "orbitLeft" },
      { id: "djangoTop", src: "/objects/backend/parts/django-top-node.png", x: 50, y: 15, width: 17, z: 22, motion: "floatMedium" },
      { id: "apiRight", src: "/objects/backend/parts/api-right-node.png", x: 72, y: 24, width: 18, z: 20, motion: "orbitRight" },
      { id: "redis", src: "/objects/backend/parts/redis-left-node.png", x: 29, y: 68, width: 18, z: 20, motion: "floatMedium" },
      { id: "postgres", src: "/objects/backend/parts/postgres-right-node.png", x: 72, y: 68, width: 18, z: 20, motion: "floatMedium" },
      { id: "service", src: "/objects/backend/parts/service-bottom-node.png", x: 50, y: 79, width: 17, z: 22, motion: "floatFast" }
    ]
  },
  workstation: {
    page: "skills",
    fallback: "/objects/workstation/full/workstation-full.png",
    parts: [
      { id: "laptop", src: "/objects/workstation/parts/laptop-and-code-panels.png", x: 51, y: 45, width: 52, z: 20, motion: "floatSlow" },
      { id: "server", src: "/objects/workstation/parts/server-stack.png", x: 29, y: 70, width: 18, z: 25, motion: "floatMedium" },
      { id: "database", src: "/objects/workstation/parts/database-cylinder.png", x: 69, y: 25, width: 18, z: 18, motion: "floatMedium" },
      { id: "react", src: "/objects/workstation/parts/react-token.png", x: 17, y: 49, width: 13, z: 30, motion: "orbitLeft" },
      { id: "nextjs", src: "/objects/workstation/parts/nextjs-token.png", x: 19, y: 31, width: 14, z: 30, motion: "orbitLeft" },
      { id: "javascript", src: "/objects/workstation/parts/javascript-token.png", x: 18, y: 65, width: 14, z: 30, motion: "orbitLeft" },
      { id: "python", src: "/objects/workstation/parts/python-token.png", x: 45, y: 86, width: 14, z: 30, motion: "floatFast" },
      { id: "django", src: "/objects/workstation/parts/django-token.png", x: 57, y: 86, width: 14, z: 30, motion: "floatFast" },
      { id: "postgres", src: "/objects/workstation/parts/postgres-token.png", x: 70, y: 82, width: 13, z: 30, motion: "orbitRight" },
      { id: "docker", src: "/objects/workstation/parts/docker-token.png", x: 86, y: 52, width: 13, z: 30, motion: "orbitRight" },
      { id: "redisTop", src: "/objects/workstation/parts/redis-top-token.png", x: 84, y: 40, width: 13, z: 29, motion: "orbitRight" },
      { id: "redisBottom", src: "/objects/workstation/parts/redis-bottom-token.png", x: 84, y: 64, width: 13, z: 29, motion: "orbitRight" }
    ]
  },
  projects: {
    page: "projects",
    fallback: "/objects/projects/full/projects-portal-full.png",
    parts: [
      { id: "outerRings", src: "/objects/projects/parts/outer-rings.png", x: 50, y: 51, width: 82, z: 10, motion: "rotateSlow" },
      { id: "leftRing", src: "/objects/projects/parts/left-ring-section.png", x: 31, y: 51, width: 45, z: 12, motion: "tiltLeft" },
      { id: "rightRing", src: "/objects/projects/parts/right-ring-section.png", x: 69, y: 51, width: 45, z: 13, motion: "tiltRight" },
      { id: "core", src: "/objects/projects/parts/nextjs-core.png", x: 50, y: 50, width: 29, z: 25, motion: "floatMedium" }
    ]
  },
  devops: {
    page: "contact",
    fallback: "/objects/devops/full/devops-full.png",
    parts: [
      { id: "leftLoop", src: "/objects/devops/parts/left-loop.png", x: 28, y: 53, width: 48, z: 10, motion: "tiltLeft" },
      { id: "rightLoop", src: "/objects/devops/parts/right-loop.png", x: 72, y: 53, width: 48, z: 11, motion: "tiltRight" },
      { id: "bridge", src: "/objects/devops/parts/center-bridge.png", x: 50, y: 48, width: 31, z: 18, motion: "floatSlow" },
      { id: "code", src: "/objects/devops/parts/code-node.png", x: 25, y: 20, width: 12, z: 30, motion: "floatFast" },
      { id: "settings", src: "/objects/devops/parts/settings-node.png", x: 12, y: 42, width: 12, z: 30, motion: "floatMedium" },
      { id: "security", src: "/objects/devops/parts/security-node.png", x: 25, y: 71, width: 13, z: 30, motion: "floatFast" },
      { id: "deploy", src: "/objects/devops/parts/deploy-node.png", x: 50, y: 39, width: 13, z: 32, motion: "floatFast" },
      { id: "cloud", src: "/objects/devops/parts/cloud-node.png", x: 56, y: 51, width: 14, z: 31, motion: "floatMedium" },
      { id: "docker", src: "/objects/devops/parts/docker-node.png", x: 76, y: 20, width: 13, z: 30, motion: "floatFast" },
      { id: "power", src: "/objects/devops/parts/power-node.png", x: 91, y: 42, width: 12, z: 30, motion: "floatMedium" },
      { id: "monitor", src: "/objects/devops/parts/monitor-node.png", x: 75, y: 71, width: 13, z: 30, motion: "floatFast" }
    ]
  },
  certificate: {
    page: "certificates",
    fallback: "/objects/certificate/full/certificate-full.png",
    parts: [
      { id: "ring", src: "/objects/certificate/parts/portal-ring.png", x: 50, y: 50, width: 84, z: 10, motion: "rotateSlow" },
      { id: "document", src: "/objects/certificate/parts/certificate-document.png", x: 48, y: 53, width: 37, z: 20, motion: "floatSlow" },
      { id: "shield", src: "/objects/certificate/parts/verified-shield.png", x: 65, y: 68, width: 22, z: 30, motion: "floatFast" }
    ]
  }
};
