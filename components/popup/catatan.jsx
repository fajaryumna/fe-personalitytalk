import Image from "next/image";
import { useEffect, useState } from "react";
import { getToken } from "@/lib/auth";

export default function Catatan({ onClose }) {
    const [complaint, setComplaint] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    // Ambil data dari localstorage saat komponen dimuat
    useEffect(() => {
        const savedComplaint = localStorage.getItem("savedComplaint");
        const savedIsDisabled = localStorage.getItem("isDisabled");

        if (savedComplaint) setComplaint(savedComplaint);
        if (savedIsDisabled) setIsDisabled(savedIsDisabled === "true");
    }, []);

    const handleSubmit = async () => {
        // Ambil id_transaction dari localStorage
        const transactionData = JSON.parse(localStorage.getItem("transactionData"));
        if (!transactionData || !transactionData.id_transaction) {
            alert("ID transaksi tidak ditemukan di localStorage!");
            return;
        }

        const idTransaction = transactionData.id_transaction;

        setIsSubmitting(true);

        try {
            // Ambil token autentikasi
            const token = getToken();
            if (!token) {
                alert("Anda perlu login untuk mengakses halaman ini.");
                router.push("/login");
                return;
            }

            // Log data sebelum dikirim
            console.log("ID Transaksi:", idTransaction);
            console.log("Patient Complaint:", complaint);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/consultation/submit-complaint`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "69420",
                },
                body: JSON.stringify({
                    consul_transaction_id: idTransaction,
                    patient_complaint: complaint,
                }),
            });

            const responseData = await response.json();
            if (response.ok) {
                alert("Keluhan berhasil dikirim.");
                // Set textarea dengan keluhan dari response
                setComplaint(responseData.data.patient_complaint);
                // Disable button setelah berhasil
                setIsDisabled(true);

                // Simpan ke localStorage
                localStorage.setItem("savedComplaint", responseData.data.patient_complaint);
                localStorage.setItem("isDisabled", "true");
            } else {
                alert(`Gagal mengirim keluhan: ${responseData.message || "Terjadi kesalahan."}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Terjadi kesalahan saat mengirim keluhan.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal-container">
            <div className="bg-primary text-whitebg px-6 py-4 rounded-t-lg flex justify-between items-center">
                <div className="flex flex-col">
                    <p className="text-m font-semibold">Tambah Keluhan</p>
                    <p className="text-s font-light">
                        Berikan catatan keluhan kepada psikolog untuk dibaca sebelum memulai Konsultasi
                    </p>
                </div>
                <Image
                    src="/icons/close.png"
                    alt="Tutup"
                    width={26}
                    height={26}
                    className="cursor-pointer"
                    onClick={onClose}
                />
            </div>
            <div className="p-6">
            <textarea
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Masukkan catatan"
                    value={complaint}
                    onChange={(e) => setComplaint(e.target.value)}
                    disabled={isDisabled}
                ></textarea>
                <div className="flex justify-end mt-2">
                    <button
                        onClick={handleSubmit}
                        className={`px-4 py-2 rounded-md ${isDisabled ? "bg-disable" : "bg-primary"} text-white`}
                        disabled={isDisabled || isSubmitting}
                    >
                        {isSubmitting ? "Mengirim..." : "Tambah"}
                    </button>
                </div>
            </div>
        </div>
    );
}
