
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth functions
export const signUp = async (email: string, password: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
  
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  return { user: data.user, error };
};

// Database functions - Scan records
export const saveScanRecord = async (userId: string, imageUrl: string, result: any) => {
  const { data, error } = await supabase
    .from('scan_records')
    .insert([
      { 
        user_id: userId, 
        image_path: imageUrl, 
        result_data: result,
        created_at: new Date().toISOString()
      }
    ]);
  
  return { data, error };
};

export const getUserScans = async (userId: string) => {
  const { data, error } = await supabase
    .from('scan_records')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  return { data, error };
};

// Storage functions - MRI scan images
export const uploadScanImage = async (userId: string, file: File) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${Date.now()}.${fileExt}`;
  const filePath = `scans/${fileName}`;

  const { data, error } = await supabase.storage
    .from('mri_scans')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    return { error };
  }

  // Get public URL for the uploaded file
  const { data: { publicUrl } } = supabase.storage
    .from('mri_scans')
    .getPublicUrl(filePath);

  return { filePath, publicUrl, error: null };
};

export const deleteScanImage = async (filePath: string) => {
  const { error } = await supabase.storage
    .from('mri_scans')
    .remove([filePath]);
  
  return { error };
};
