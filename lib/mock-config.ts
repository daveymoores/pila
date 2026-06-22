export const MOCK_AUTH_TOKEN = "mock-pila-dev-token";
export const MOCK_AUTH_UID = "mock-pila-user";

export function isMockIntegrations(): boolean {
  return (
    process.env.MOCK_INTEGRATIONS === "true" ||
    process.env.NEXT_PUBLIC_MOCK_INTEGRATIONS === "true"
  );
}

export function getMockAuthEmail(): string {
  return process.env.NEXT_PUBLIC_MOCK_AUTH_EMAIL || "dev@pila.local";
}

export function getMockAuthPassword(): string {
  return process.env.NEXT_PUBLIC_MOCK_AUTH_PASSWORD || "devpassword";
}

export function isMockAuthCredentials(
  email: string,
  password: string,
): boolean {
  return (
    isMockIntegrations() &&
    email === getMockAuthEmail() &&
    password === getMockAuthPassword()
  );
}

export function isMockAuthToken(token?: string): boolean {
  return isMockIntegrations() && token === MOCK_AUTH_TOKEN;
}
