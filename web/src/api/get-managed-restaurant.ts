import { api } from "@/lib/axios";

interface GetManagerRestaurantResponse {
  id: string;
  name: string;
  description: Date | null;
  managerId: string | null;
  createdAt: Date | null;
  updateAt: Date | null;
}

export async function getManagerRestaurant() {
  const response = await api.get<GetManagerRestaurantResponse>(
    "/managed-restaurant",
  );

  return response.data;
}
