import Purchases, {
  CustomerInfo,
  PurchasesOffering,
} from "react-native-purchases";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
const APIKeys = {
  apple: "appl_mTTdHSJWtMTIsPypmaQXWiXGVzs",
  google: "",
};

function useRevenueCat() {
  const [currentOffering, setCurrentOffering] = useState(null);
  const [customerInfo, setCustomerInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (Platform.OS === "android") {
        await Purchases.configure({ apiKey: APIKeys.google });
      } else {
        console.log("apple");
        await Purchases.configure({ apiKey: APIKeys.apple });
      }
      console.log("getofferings");
      const offerings = await Purchases.getOfferings();
      console.log("getcustomerinfo");
      const customerInfo = await Purchases.getCustomerInfo();

      setCurrentOffering(offerings.current);
      setCustomerInfo(customerInfo);
    };

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const customerInfoUpdated = async (purchaserInfo) => {
      setCustomerInfo(purchaserInfo);
    };

    Purchases.addPurchaserInfoUpdateListener(customerInfoUpdated);
  }, []);

  return { currentOffering, customerInfo };
}

export default useRevenueCat;
