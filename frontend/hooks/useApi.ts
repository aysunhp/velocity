'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  carsApi,
  categoriesApi,
  contactApi,
  reviewsApi,
  faqsApi,
  blogApi,
  bookingsApi,
} from '@/lib/api';
import type { Booking, CarsQuery, ContactMessage } from '@/types';

export const useFeaturedCars = () =>
  useQuery({
    queryKey: ['cars', 'featured'],
    queryFn: async () => (await carsApi.featured()).data,
  });

export const useCars = (query: CarsQuery = {}) =>
  useQuery({
    queryKey: ['cars', 'list', query],
    queryFn: async () => carsApi.list(query),
  });

export const useCarBySlug = (slug: string) =>
  useQuery({
    enabled: !!slug,
    queryKey: ['cars', 'slug', slug],
    queryFn: async () => (await carsApi.bySlug(slug)).data,
  });

export const useCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: async () => (await categoriesApi.list()).data,
  });

export const useFeaturedReviews = () =>
  useQuery({
    queryKey: ['reviews', 'featured'],
    queryFn: async () => (await reviewsApi.featured()).data,
  });

export const useFaqs = () =>
  useQuery({
    queryKey: ['faqs'],
    queryFn: async () => (await faqsApi.list()).data,
  });

export const useBlogs = (params: { page?: number; limit?: number } = {}) =>
  useQuery({
    queryKey: ['blogs', params],
    queryFn: async () => blogApi.list(params),
  });

export const useSendContactMessage = () =>
  useMutation({
    mutationFn: (payload: ContactMessage) => contactApi.send(payload).then((r) => r.data),
  });

export const useCreateBooking = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Omit<Booking, '_id' | 'status' | 'createdAt'>) =>
      bookingsApi.create(payload).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['bookings'] }),
  });
};
