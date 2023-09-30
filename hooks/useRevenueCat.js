import Purchases from "react-native-purchases";
import { showMessage, hideMessage } from "react-native-flash-message";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import useAuth from "./useAuth";
const APIKeys = {
  apple: "appl_mTTdHSJWtMTIsPypmaQXWiXGVzs",
  google: "",
};

function useRevenueCat() {
  const [currentOffering, setCurrentOffering] = useState(null);
  const [customerInfo, setCustomerInfo] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const offerings = await Purchases.getOfferings();
      const customerInfo = await Purchases.getCustomerInfo();
      setCurrentOffering(offerings.current);
      setCustomerInfo(customerInfo);
    };

    fetchData().catch((err) =>
      showMessage({
        message: "There was an error fetching your data.",
        type: "danger",
      })
    );
  }, []);

  useEffect(() => {
    const customerInfoUpdated = async (purchaserInfo) => {
      setCustomerInfo(purchaserInfo);
    };

    Purchases.addCustomerInfoUpdateListener(customerInfoUpdated);

    return () =>
      Purchases.removeCustomerInfoUpdateListener(customerInfoUpdated);
  }, []);

  return { currentOffering, customerInfo };
}

export default useRevenueCat;
