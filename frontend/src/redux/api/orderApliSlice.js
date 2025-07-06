import {apiSlice} from './apiSlice'
import { ORDERS_URL, PAYPAL_URL } from '../constants'
import { createOrder } from '../../../../Backend/controllers/orderController'

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query : (order) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: order
            })
        }),

        getOrderDetails: buildCreateApi.query({
            query: (id) => ({
                url: `${ORDERS_URL}/${id}`
            })
        }),

    payOrder: builder.mutation({
        query: ({orderId, details}) => ({
            url: `${ORDERS_URL}/${orderId}/pay`,
            method: "PUT",
            body: details
        }),
    }), 

    getPaypalClientId: builder.query({
        query: () => ({
            url: PAYPAL_URL
        })
    }),

    getMyOrders: builder.query({
        query: () => ({
            url: `${ORDERS_URL}/mine`
        }),
        keepUnusedDataFor: 5,
    }),

    getOrders: builder.query({
        query: () => ({
            url: ORDERS_URL
        }),
    }),

    deliverOrder: builder.mutation({
        query: (orderId) => ({
            url: `${ORDERS_URL}/${orderId}/deliver`,
            method: 'PUT'
        })
    }),

    getTotalSales: builder.query({
        query: () => `${ORDERS_URL}/total-sales`
    }),

    getTotalSalesByDate: builder.query({
        query: () => `${ORDERS_URL}/total-sales-by-date`
    }),
    })
})

export const {
    useGetTotalOrderQuery,
    useGetTotalSalesQuery ,
    useGetTotalSalesByDateQuery,

    useCreateOrderMutation,
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useGetMyOrdersQuery,
    useDeliverOrderMutation,
    useGetOrdersQuery



} = orderApiSlice