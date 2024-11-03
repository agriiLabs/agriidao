const GenerateReferralCode = async (id: string, length = 8) => {
  if (!id) {
    throw new Error(
      "Invalid ID: Cannot generate referral code without a valid ID."
    );
  }

  try {
    // Use the Crypto API to create a hash of the ID
    const encoder = new TextEncoder();
    const data = encoder.encode(id);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    // Convert the hash to a hexadecimal string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    // Truncate the hash to the desired length
    return hashHex.slice(0, length).toUpperCase();
  } catch (error) {
    console.error("Error generating referral code:", error);
    throw error;
  }
};

export default GenerateReferralCode;
