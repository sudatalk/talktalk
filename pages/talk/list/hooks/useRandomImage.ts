import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const DUMMY_IMAGE_URL = "https://picsum.photos/60";
const FALLBACK_IMAGES = [
  require("@/assets/profile/profile1.png"),
  require("@/assets/profile/profile2.png"),
  require("@/assets/profile/profile3.png"),
  require("@/assets/profile/profile4.png"),
  require("@/assets/profile/profile5.png"),
];
const DEFAULT_TIMEOUT = 3000;

const randomImageQueryKey = ["GET_RANDOM_IMAGE"];
const randomImageQueryFn = async () => {
  const result = await Promise.all(
    Array.from({ length: 5 }, (_, idx) =>
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
        .catch(() => FALLBACK_IMAGES[idx])
    )
  );

  return result;
};

const useRandomImage = () => {
  return useQuery({
    queryKey: randomImageQueryKey,
    queryFn: randomImageQueryFn,
    refetchOnMount: true,
  });
};

export default useRandomImage;
