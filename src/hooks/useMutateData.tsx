/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";

type RequestPayload = {
  url: string,
  payload: any,
};

const getData = async (request: RequestPayload): Promise<any> => {
    const response = await fetch(request.url, {
        method: "GET",
        // body: JSON.stringify(request.payload)
    });
    return await response.json();
}

type SuccessCallback = (data: any) => void;
type ErrorCallback = (error: any) => void;


interface MutationHookResult {
    data: any;
    error: any;
    isError: boolean;
    isSuccess: boolean;
    mutate: (payload: RequestPayload) => void;
    mutateAsync: (payload: RequestPayload) => Promise<any>;
    reset: () => void;
    status: string | null;
    onSuccess: SuccessCallback | undefined;
}


export const useMutateData = (title: string, onSuccess?: SuccessCallback, onError?: ErrorCallback): MutationHookResult => {
    
    const queryClient = useQueryClient();

    const fetchCachedData = () => {
      return queryClient.getQueryData([title]);
    };
    
    
    const mutation = useMutation({
      mutationKey: [title],
      mutationFn: getData,
      onError: onError,
      onSuccess: (data) => {
        queryClient.setQueryData([title], data);
        if (onSuccess) onSuccess(data);
      },
    });

    return {
      data: fetchCachedData(),
      error: mutation.error,
      isError: mutation.isError,
      isSuccess: mutation.isSuccess,
      mutate: mutation.mutate,
      mutateAsync: mutation.mutateAsync,
      reset: mutation.reset,
      status: mutation.status,
      onSuccess: onSuccess,
    };
}