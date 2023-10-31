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
    myOffers: builder.query({
      query: (pageNumber) => ({
        url: `/offers/my-offers?pageNumber=${pageNumber}`,
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
    editOffer: builder.mutation({
      query: (offerData) => ({
        url: "/offers/edit",
        method: "PATCH",
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
  }),
});

export const {
  useNewOfferMutation,
  useMyOffersQuery,
  useEditOfferMutation,
} = OfferApiSlice;
