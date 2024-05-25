import { useEffect, useState } from "react";
import { Models } from "react-native-appwrite";
import { Alert } from "react-native";

const useAppwrite = (fn: Function) => {
  const [data, setData] = useState<Models.Document[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fn();

      setData(response);
    } catch (error: any) {
      Alert.alert("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, isLoading, refetch };
};

export default useAppwrite;
