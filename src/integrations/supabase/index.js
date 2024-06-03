import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

Dishes // table: dishes
    id: number
    created_at: string
    name: string
    country: string
    size: string
    type: string
    price: number

Orders // table: orders
    id: number
    created_at: string
    dish_id: number
    quantity: number
    total_price: number

Customers // table: customers
    id: number
    created_at: string
    name: string
    email: string
    phone: string

*/

// Hooks for models

// Dishes
export const useDishes = () => useQuery({
    queryKey: ['dishes'],
    queryFn: () => fromSupabase(supabase.from('dishes').select('*')),
});

export const useAddDish = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newDish) => fromSupabase(supabase.from('dishes').insert([newDish])),
        onSuccess: () => {
            queryClient.invalidateQueries('dishes');
        },
    });
};

export const useUpdateDish = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedDish) => fromSupabase(supabase.from('dishes').update(updatedDish).eq('id', updatedDish.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('dishes');
        },
    });
};

export const useDeleteDish = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('dishes').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('dishes');
        },
    });
};

// Orders
export const useOrders = () => useQuery({
    queryKey: ['orders'],
    queryFn: () => fromSupabase(supabase.from('orders').select('*')),
});

export const useAddOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newOrder) => fromSupabase(supabase.from('orders').insert([newOrder])),
        onSuccess: () => {
            queryClient.invalidateQueries('orders');
        },
    });
};

export const useUpdateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedOrder) => fromSupabase(supabase.from('orders').update(updatedOrder).eq('id', updatedOrder.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('orders');
        },
    });
};

export const useDeleteOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('orders').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('orders');
        },
    });
};

// Customers
export const useCustomers = () => useQuery({
    queryKey: ['customers'],
    queryFn: () => fromSupabase(supabase.from('customers').select('*')),
});

export const useAddCustomer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newCustomer) => fromSupabase(supabase.from('customers').insert([newCustomer])),
        onSuccess: () => {
            queryClient.invalidateQueries('customers');
        },
    });
};

export const useUpdateCustomer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedCustomer) => fromSupabase(supabase.from('customers').update(updatedCustomer).eq('id', updatedCustomer.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('customers');
        },
    });
};

export const useDeleteCustomer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('customers').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('customers');
        },
    });
};