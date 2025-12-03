import { getMaintenance, getVersion } from "@/services/maintenance";
import { useQuery } from "@tanstack/react-query";

const useApp = () => {
  return useQuery({
    queryKey: [],
    queryFn: async () => {
      const [maintenance, version] = await Promise.all([getMaintenance(), getVersion()]);

      return {
        maintenance,
        version,
      };
    },
  });
};

export default useApp;
