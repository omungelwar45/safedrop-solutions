export type AuthLoginResponse = {
  token: string;
  user: {
    email: string;
    name: string;
  };
};

export type ReminderItem = {
  id: string;
  title: string;
  time: string;
  channel: "push" | "sms" | "email";
  enabled: boolean;
};

export type PickupRequestInput = {
  fullName: string;
  phoneNumber: string;
  pickupAddress: string;
  preferredDate: string;
  preferredTime: string;
  medicineNotes?: string;
};

const request = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });

  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const payload = isJson ? await response.json() : null;

  if (!response.ok) {
    const message = (payload && typeof payload.error === "string" && payload.error) || "Request failed.";
    throw new Error(message);
  }

  return payload as T;
};

export const loginApi = async (email: string, password: string) => {
  return request<AuthLoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const listRemindersApi = async () => {
  return request<{ reminders: ReminderItem[] }>("/api/reminders", {
    method: "GET",
  });
};

export const updateReminderApi = async (id: string, enabled: boolean) => {
  return request<{ reminder: ReminderItem }>(`/api/reminders/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ enabled }),
  });
};

export const createPickupApi = async (input: PickupRequestInput) => {
  return request<{ id: string }>("/api/pickups", {
    method: "POST",
    body: JSON.stringify(input),
  });
};
