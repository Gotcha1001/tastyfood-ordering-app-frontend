import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//Create New HOOK GET the Restaurant to PRE POPULATE the FORM
export const useGetMyRestaurant = () => {
  //1 get the access token first
  const { getAccessTokenSilently } = useAuth0();
  //2 create the GET request no parameters
  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    // 3 Get the TOKEN
    const accessToken = await getAccessTokenSilently();
    // 4 Fetch request using the API base url and route endpoint
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      // 5 OPTIONS method, head, body
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    //6. Error handling
    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }
    //7. Return the response OBJECT
    return response.json();
  };

  //8 useQuery to manage the request
  const { data: restaurant, isLoading } = useQuery(
    "fetchMyRestaurant",
    getMyRestaurantRequest
  );

  //9 return some stuff outside of our HOOK so components can get access to it
  return { restaurant, isLoading };
};

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  // THE HOOK for POST
  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });
    if (!response.ok) {
      throw new Error("Failed to create restaurant");
    }
    return response.json();
  };

  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant created!");
  }

  if (error) {
    toast.error("Unable to update restaurant");
  }

  return { createRestaurant, isLoading };
};

export const useUpdateMyRestaurant = () => {
  // 1 get the token
  const { getAccessTokenSilently } = useAuth0();
  // 2 get the function that will call the ENDPOINT we created
  const updateRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    //3 Get our access token
    const accessToken = await getAccessTokenSilently();
    //4 make the response fetch request
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });
    //5. Check the respons
    if (!response.ok) {
      throw new Error("Failed to update restaurant");
    }
    //6 If all goes well return the response....
    return response.json();
  };
  //7 de structure and pass this to the useMutation HOOK
  const {
    mutate: updateRestaurant,
    isLoading,
    error,
    isSuccess,
  } = useMutation(updateRestaurantRequest);

  //8 add our toasts
  if (isSuccess) {
    toast.success("Restaurant Updated Successfully");
  }
  if (error) {
    toast.error("Unable to update restaurant");
  }

  //9 return stuff we want to expose from this hook
  return { updateRestaurant, isLoading };
};
