import { auth } from '@/auth';
import { cache } from 'react';

// Stops duplicate auth calls on each server request
export default cache(auth);
