import {create} from 'zustand'
import { orderApi } from '../api/orderApi'

export const useOrdersStore = create((set,get)=> ({
    orders:[],
    currentOrder:null,
    isLoading:false,
    error:null,

    loadOrders:async()=> {
        set({isLoading:true,error:null})
        try{
            const data = await orderApi.getOrders()
            set({orders:data,isLoading:false})
        } catch(err) {
            set({error:err.message,isLoading:false})
            if(err.status===401)set({orders:[]})
        }
    },

    createOrder:async()=> {
        set({isLoading:true,error:null})
    try {
        const newOrder = await orderApi.createOrder()
        set((state)=> ({
            orders:[newOrder,...state.orders],
            isLoading:false,
    })) 
    return newOrder
    }catch(err) {
        set({error:err.message,isLoading:false})
        throw err
    }
  },

  fetchOrder:async(orderId)=> {
    const cached = get().orders.find((o)=>o.id===orderId)
    if (cached) {
        set({currentOrder:cached})
        return cached
    }
    set({isLoading:true,error:null})
    try {
        const data = await orderApi.getOrderById(orderId)
        set({currentOrder:data,isLoading:false})
        return data
    } catch (err) {
        set({error:err.message,isLoading:false})
        throw err
    }
  },

  cancelOrder: async(orderId)=> {
    const prevOrders=get().orders

    set((state)=> ({
        orders:state.orders.map((o)=>
            o.id===orderId?{...o,status:'cancelled'}:o
    ),
    currentOrder:
     state.currentOrder?.id===orderId
      ?{...state.currentOrder,status:'cancelled'}
      :state.currentOrder,
    }))

    try {
        await orderApi.cancelOrder(orderId)
    } catch (err) {
        set({orders:prevOrders,error:err.message})
        throw err
    }
  },

  clearError:()=> set({error:null}),
 }))