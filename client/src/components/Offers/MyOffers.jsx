import { useEffect } from "react";
import { useMyOffersMutation } from "../../Redux/Listing/offerApiSlice";

const MyOffers = () => {
  const [myOffers, {}] = useMyOffersMutation();

  useEffect(() => {
    async function loadData() {
      try {
        const data = await myOffers();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    loadData();
  }, []);

  return (
    <>
      <div>MyOffers</div>
    </>
  );
};

export default MyOffers;
