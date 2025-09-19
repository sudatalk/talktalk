import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const DUMMY_IMAGE_URL = "https://picsum.photos/60";

const DEFAULT_TIMEOUT = 10000;

const randomImageQueryKey = ["GET_RANDOM_IMAGE"];
const randomImageQueryFn = async () =>
  Promise.all(
    Array.from({ length: 6 }, () =>
      axios
        .get(`${DUMMY_IMAGE_URL}`, {
          timeout: DEFAULT_TIMEOUT,
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        })
        .then((res) => res.request.responseURL as string)
        .catch(() => "")
    )
  );

const useRandomImage = () => {
  return useQuery({
    queryKey: randomImageQueryKey,
    queryFn: randomImageQueryFn,
    refetchOnMount: true,
  });
};

export default useRandomImage;
