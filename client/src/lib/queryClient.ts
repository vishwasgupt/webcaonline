import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { defaultServices } from "../data/services";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Mock API logic for static frontend
  console.log(`[Mock API] ${method} ${url}`, data);

  // Return a mock success response
  return new Response(JSON.stringify({ success: true, message: "Mocked API Request" }), {
    status: 201,
    headers: { "Content-Type": "application/json" }
  });
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const url = queryKey.join("/") as string;
    console.log(`[Mock API] GET ${url}`);

    // Mock endpoints
    if (url === "/api/services") {
      return defaultServices as any;
    }

    if (url.startsWith("/api/services/")) {
      const id = url.split("/").pop();
      const service = defaultServices.find(s => s.id === id);
      if (service) return service as any;
      throw new Error(`404: Service not found`);
    }

    // Default fallback
    const res = await fetch(url, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
