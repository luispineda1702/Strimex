import { useEffect, useState } from "react";
import { HomeAPI } from "../../data/source/remote/api/home.api";

export const useHome = () => {
  const [loading, setLoading] = useState(true);
  const [homeData, setHomeData] = useState<any>(null);

  const loadHome = async () => {
    try {
      setLoading(true);
      const data = await HomeAPI.getHome();
      setHomeData(data);
    } catch (error) {
      console.log("Error cargando home:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHome();
  }, []);

  return { loading, homeData };
};
