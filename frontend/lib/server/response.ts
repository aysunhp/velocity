/**
 * Response envelope shared by every route handler — mirrors
 * `backend/src/utils/ApiResponse.js` so the client's `unwrap()` keeps working.
 */

import { NextResponse } from 'next/server';
import type { PaginationMeta } from '@/types';

export function ok<T>(data: T, meta?: PaginationMeta) {
  return NextResponse.json({ success: true, data, ...(meta ? { meta } : {}) });
}

export function created<T>(data: T) {
  return NextResponse.json({ success: true, data }, { status: 201 });
}

export function fail(status: number, message: string, errors?: Record<string, string[]>) {
  return NextResponse.json(
    { success: false, message, ...(errors ? { errors } : {}) },
    { status }
  );
}

export const notFound = (message: string) => fail(404, message);
