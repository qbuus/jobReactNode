import { apiSliceWithAuth } from "../Api/apiSlice";
import {
  setMessage,
  setErrorMessage,
} from "../states/messageSlice";

export const OfferApiSlice = apiSliceWithAuth.injectEndpoints({
  endpoints: (builder) => ({
    newOffer: builder.mutation({
      query: (offerData) => ({
        url: "/offers/new",
        method: "POST",
        body: { ...offerData },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled;
          dispatch(setMessage(data.data.message));
        } catch (error) {
          dispatch(setErrorMessage(error.error.data.message));
        }
      },
    }),
    myOffers: builder.mutation({
      query: () => ({
        url: "/offers/my-offers",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled;
          dispatch(setMessage(data.data.message));
        } catch (error) {
          dispatch(setErrorMessage(error.error.data.message));
        }
      },
    }),
  }),
});

export const { useNewOfferMutation, useMyOffersMutation } =
  OfferApiSlice;
