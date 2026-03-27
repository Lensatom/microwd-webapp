import { QueryClient } from "@tanstack/react-query";
import { getAdaptiveRetryDelay, isTransientApiError } from "../api/axios";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: (failureCount, error) => {
				if (!isTransientApiError(error)) {
					return false;
				}

				return failureCount < 4;
			},
			retryDelay: (attemptIndex) => getAdaptiveRetryDelay(attemptIndex),
			refetchOnWindowFocus: false,
		},
	},
});