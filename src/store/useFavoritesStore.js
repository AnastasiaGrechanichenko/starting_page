import {create} from 'zustand'
import { favoriteApi} from '../api/favoriteApi'

export const useFavoritesStore=create((set,get) => ({
    items:[],
    isLoading:false,
    error:null,

    loadFavorites:async()=> {
        set({isLoading:true,error:null})
        try {
            const data = await favoriteApi.getFavorites()
            set({items:data, isLoading:false})
        } catch (err) {
            set({error:err.message, isLoading:false})
            if (err.status===401) set({items:[]})
        }
    },

    addFavorite:async(bookId)=> {
        try{
            const newItem= await favoriteApi.addToFavorite(bookId)
            set({items:[newItem,...get().items],error:null})
        } catch(err){
            if(err.message?.includes('уже есть')|| err.message?.includes('Уже есть')) {
                await get().loadFavorites()
            } else {
                set({error:err.message})
            }
        }
    },

    removeFavorite:async(bookId)=> {
        const prevItems = get().items
        set({items:prevItems.filter(item=>item.book_id!==bookId)})
        try {
            await favoriteApi.removeFavorite(bookId)
        }catch(err) {
            set({items:prevItems, error:err.message})
        }
    },

    clearFavorites:async()=> {
        try{
            await favoriteApi.clearFavorites()
            set({items:[],error:null})
        } catch(err){
            set({error:err.message})
        }
    },

    toggleFavorite: async(bookId)=> {
        const isFav = get().isFavorite(bookId)
    
        if(isFav) {
            await get().removeFavorite(bookId)
        } else {
            await get().addFavorite(bookId)
        }
    },

    isFavorite:(bookId)=> {
        return get().items.some(item=>item.book_id===bookId)
    },

  }))

