// hooks/useUser.js
import useSWR from "swr";
import { getUserDetail, updateProfile } from "@/api/user";

const fetchUserDetail = async () => {
  try {
    const userDetails = await getUserDetail();
    return {
      nama: userDetails.name,
      email: userDetails.email,
      joined_at: userDetails.joined_at,
      role: userDetails.role,
      photoProfile: userDetails.photoProfile,
      gender: userDetails.gender,
      dateBirth: userDetails.dateBirth,
      phoneNumber: userDetails.phoneNumber,
      universitas: userDetails.universitas,
      jurusan: userDetails.jurusan,
    };
  } catch (error) {
    throw new Error("Error fetching user profile");
  }
};

export const useUser = () => {
  // Menggunakan SWR untuk mengambil data user
  const { data, error, mutate } = useSWR("/user/profile", fetchUserDetail);

  // Fungsi untuk memperbarui profil pengguna
  const updateUserProfile = async (formData) => {
    try {
      mutate(
        async (prevData) => {
          await updateProfile(formData); // Update data di server
          return { ...prevData, ...formData }; // Update data lokal di cache SWR
        },
        { revalidate: false }
      ); // Menghindari refetch
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    updateUserProfile,
    mutate,
  };
};