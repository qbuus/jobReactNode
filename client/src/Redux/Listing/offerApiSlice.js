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
    deleteOffer: builder.mutation({
      query: (id) => ({
        url: "/offers/delete",
        method: "DELETE",
        body: { ...id },
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
    latestOffer: builder.mutation({
      query: () => ({
        url: "/offers/latest",
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
    highlightedOffer: builder.mutation({
      query: () => ({
        url: "/offers/highlighted",
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
    allOffer: builder.query({
      query: ({ pageNumber, skill }) => ({
        url: `/offers/alloffers?pageNumber=${pageNumber}&skill=${skill}`,
      }),
    }),
    singleOffer: builder.query({
      query: (id) => ({
        url: `/offers/offer/${id}`,
      }),
    }),
  }),
});

export const {
  useNewOfferMutation,
  useMyOffersQuery,
  useEditOfferMutation,
  useDeleteOfferMutation,
  useLatestOfferMutation,
  useHighlightedOfferMutation,
  useAllOfferQuery,
  useSingleOfferQuery,
} = OfferApiSlice;
